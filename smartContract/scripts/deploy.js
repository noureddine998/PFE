const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const MoroccanElections = await hre.ethers.getContractFactory("MoroccanElections");
  // Deploy the contract
  const moroccanElections = await MoroccanElections.deploy();

  // Ensure the contract is deployed properly
  await moroccanElections.waitForDeployment();

  console.log("MoroccanElections deployed to:", moroccanElections.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
