// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MoroccanElections {
    address public admin;

    enum districtType { local , regional }
    enum Gender { male , female }

    struct Voter {
        uint age;
        string cinHash;
        string region;
        string localDistrict;
        bool hasVotedLocal;
        bool hasVotedRegional;
    }

    struct Candidate {
        string fullName;
        uint age;
        Gender gender;
        string party;
        uint voteCount;
        uint seatsWon;
    }

    struct District {
        districtType dsType;
        string name;
        uint seatsToWin;
        uint numberOfVoters;
        mapping(string => Candidate) candidates;
        Candidate[] candidatesTable;
        mapping(address => Voter) voters;
        mapping(bytes32 => bool) registeredCINs;
    }

    mapping(string => District) public localDistricts;
    mapping(string => District) public regionalDistricts;
     string[] public localDistrictNames;
     string[] public regionalDistrictNames;

    bool public electionStarted = false;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function startElection() public onlyAdmin {
        require(!electionStarted, "Election already started.");
        electionStarted = true;
    }

    function endElection() public onlyAdmin {
        require(electionStarted, "Election not started.");
        electionStarted = false;

       // Set seats for local candidates
        for (uint i = 0; i < localDistrictNames.length; i++) {
            setSeatsToLocalCandidates(localDistrictNames[i]);
        }

        // Set seats for regional candidates
        for (uint i = 0; i < regionalDistrictNames.length; i++) {
            setSeatsToRegionalCandidates(regionalDistrictNames[i]);
        }
    }

    function createDistrict(districtType dsType, string memory districtName, uint seatsToWin) public onlyAdmin {
        require(bytes(districtName).length > 0, "District name is required.");

        District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
        require(bytes(district.name).length == 0, "District already exists.");

        district.dsType = dsType;
        district.name = districtName;
        district.seatsToWin = seatsToWin;
        district.numberOfVoters = 0;

         if (dsType == districtType.local) {
            localDistrictNames.push(districtName);
        } else {
            regionalDistrictNames.push(districtName);
        }
    }

    function addCandidate(string memory fullName, uint age, Gender gender, string memory party, districtType dsType, string memory districtName) public onlyAdmin {
        require(bytes(fullName).length > 0, "Full name is required.");
        require(bytes(party).length > 0, "Party is required.");
        require(age > 18, "Age must be greater than eighteen.");

        District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
        require(bytes(district.name).length > 0, "District does not exist.");

        if (dsType == districtType.regional) {
            require(age <= 40 || gender == Gender.female, "Age must be between 18 and 40 for male candidates.");
        }

        district.candidates[fullName] = Candidate(fullName, age, gender, party, 0, 0);
        district.candidatesTable.push(Candidate(fullName, age, gender, party, 0, 0));
    }

    function voterRegistration(uint _age, string memory cin, string memory _region, string memory _localDistrict) public {
        require(_age > 18, "Age must be greater than eighteen.");

        bytes32 cinHash = keccak256(abi.encodePacked(cin));
        require(!localDistricts[_localDistrict].registeredCINs[cinHash], "Voter with this CIN already registered in local district.");
        require(!regionalDistricts[_region].registeredCINs[cinHash], "Voter with this CIN already registered in regional district.");

        Voter memory newVoter = Voter(_age, cin, _region, _localDistrict, false, false);

        localDistricts[_localDistrict].registeredCINs[cinHash] = true;
        localDistricts[_localDistrict].voters[msg.sender] = newVoter;
        localDistricts[_localDistrict].numberOfVoters++;

        regionalDistricts[_region].registeredCINs[cinHash] = true;
        regionalDistricts[_region].voters[msg.sender] = newVoter;
        regionalDistricts[_region].numberOfVoters++;
    }

    function voteLocal(string memory candidateFullName, string memory localDistrictName) public {
        require(electionStarted, "Election not started.");
        require(localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal == false, "You have already voted in this local district.");

        localDistricts[localDistrictName].candidates[candidateFullName].voteCount++;
        localDistricts[localDistrictName].voters[msg.sender].hasVotedLocal = true;
    }

    function voteRegional(string memory candidateFullName, string memory regionName) public {
        require(electionStarted, "Election not started.");
        require(regionalDistricts[regionName].voters[msg.sender].hasVotedRegional == false, "You have already voted in this regional district.");

        regionalDistricts[regionName].candidates[candidateFullName].voteCount++;
        regionalDistricts[regionName].voters[msg.sender].hasVotedRegional = true;
    }

    function setSeatsToLocalCandidates(string memory localDistrictName) public {
        require(localDistricts[localDistrictName].dsType == districtType.local, "The district is not local.");

        uint seatsToWin = localDistricts[localDistrictName].seatsToWin;
        uint electoralDenominator = localDistricts[localDistrictName].numberOfVoters / seatsToWin;

        allocateSeats(localDistricts[localDistrictName], seatsToWin, electoralDenominator);
    }

    function setSeatsToRegionalCandidates(string memory regionalDistrictName) public {
        require(regionalDistricts[regionalDistrictName].dsType == districtType.regional, "The district is not regional.");

        uint seatsToWin = regionalDistricts[regionalDistrictName].seatsToWin;
        uint electoralDenominator = regionalDistricts[regionalDistrictName].numberOfVoters / seatsToWin;

        allocateSeats(regionalDistricts[regionalDistrictName], seatsToWin, electoralDenominator);
    }

    function allocateSeats(District storage district, uint seatsToWin, uint electoralDenominator) internal {
        while (seatsToWin > 0) {
            uint maxVotes = 0;
            uint winningCandidateIndex = 0;

            for (uint i = 0; i < district.candidatesTable.length; i++) {
                uint votes = district.candidatesTable[i].voteCount;

                if (votes > maxVotes) {
                    maxVotes = votes;
                    winningCandidateIndex = i;
                }
            }

            district.candidatesTable[winningCandidateIndex].seatsWon++;
            if (district.candidatesTable[winningCandidateIndex].voteCount > electoralDenominator) {
                district.candidatesTable[winningCandidateIndex].voteCount -= electoralDenominator;
            } else {
                district.candidatesTable[winningCandidateIndex].voteCount = 0;
            }

            seatsToWin--;
        }
    }

    function getLocalCandidate(string memory localDistrictName) public view returns (string[] memory, string[] memory, uint[] memory) {
        return getCandidateInfo(localDistricts[localDistrictName]);
    }

    function getRegionCandidate(string memory regionName) public view returns (string[] memory, string[] memory, uint[] memory) {
        return getCandidateInfo(regionalDistricts[regionName]);
    }

    function getCandidateInfo(District storage district) internal view returns (string[] memory, string[] memory, uint[] memory) {
        uint numCandidates = district.candidatesTable.length;
        string[] memory parties = new string[](numCandidates);
        string[] memory names = new string[](numCandidates);
        uint[] memory voteCounts = new uint[](numCandidates);

        for (uint i = 0; i < numCandidates; i++) {
            parties[i] = district.candidatesTable[i].party;
            names[i] = district.candidatesTable[i].fullName;
            voteCounts[i] = district.candidatesTable[i].voteCount;
        }

        return (parties, names, voteCounts);
    }

    function getCandidateSeatsWon(string memory districtName, districtType dsType, string memory candidateFullName) public view returns (uint) {
        District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
        return district.candidates[candidateFullName].seatsWon;
    }

    function getDistrictInfo(string memory districtName, districtType dsType) public view returns (string memory, uint, uint) {
        District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
        return (district.name, district.seatsToWin, district.numberOfVoters);
    }

    function getCandidateInfo(string memory candidateFullName, string memory districtName, districtType dsType) public view returns (string memory, uint, Gender, string memory, uint, uint) {
        District storage district = dsType == districtType.local ? localDistricts[districtName] : regionalDistricts[districtName];
        Candidate memory candidate = district.candidates[candidateFullName];
        return (candidate.fullName, candidate.age, candidate.gender, candidate.party, candidate.voteCount, candidate.seatsWon);
    }

    function getCandidates(string memory regionName, string memory localDistrictName) public view returns (Candidate[] memory, Candidate[] memory) {
        return (regionalDistricts[regionName].candidatesTable, localDistricts[localDistrictName].candidatesTable);
    }
}
