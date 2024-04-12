const hre = require("hardhat");

require('dotenv').config();

async function main() {
  const url = process.env.GOERLI_URL;
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new hre.ethers.providers.JsonRpcProvider(url);
  let wallet = new hre.ethers.Wallet(privateKey, provider);

  let artifacts = await hre.artifacts.readArtifact("Contract");

  // Print the artifacts
  console.log(artifacts) 
  
  let Contract = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  const contract = await Contract.deploy();
  const contractInstance = await contract.deployed();

  console.log(`Deployed to ${contractInstance.target}`);

  await contractInstance.callAttempt("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});