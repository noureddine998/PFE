export const contractAddress = "0xAA765C07D5b59df4eE209a3839299F6f4F929893"

export const contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "fullName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        },
        {
          "internalType": "enum MoroccanElections.Gender",
          "name": "gender",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "party",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "districtName",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "districtName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "seatsToWin",
          "type": "uint256"
        }
      ],
      "name": "createDistrict",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidateFullName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "districtName",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        }
      ],
      "name": "getCandidateInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "enum MoroccanElections.Gender",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "districtName",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "candidateFullName",
          "type": "string"
        }
      ],
      "name": "getCandidateSeatsWon",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "districtName",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        }
      ],
      "name": "getDistrictInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "localDistrictName",
          "type": "string"
        }
      ],
      "name": "getLocalCandidate",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "localDistrictName",
          "type": "string"
        }
      ],
      "name": "getRegionCandidate",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "localDistricts",
      "outputs": [
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "seatsToWin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfVoters",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "regionalDistricts",
      "outputs": [
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "seatsToWin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfVoters",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidateFullName",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "localDistrictName",
          "type": "string"
        }
      ],
      "name": "voteLocal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidateFullName",
          "type": "string"
        },
        {
          "internalType": "enum MoroccanElections.districtType",
          "name": "dsType",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "regionName",
          "type": "string"
        }
      ],
      "name": "voteRegional",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_age",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "cin",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_region",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_localDistrict",
          "type": "string"
        }
      ],
      "name": "voterRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "regionalDistrictName",
          "type": "string"
        }
      ],
      "name": "winnerCandidateRegional",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

