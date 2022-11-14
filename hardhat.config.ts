import { task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@graphprotocol/hardhat-graph";

task("deploy", "Deploys the passed contract")
  .addParam("contractName", "The name of the contract")
  .setAction(async (taskArgs, hre) => {
    const { contractName } = taskArgs;

    await hre.run("compile");

    const address = await deploy(hre, contractName);

    await hre.run("graph", { contractName, address });
  });

const deploy = async (hre: any, contractName: string): Promise<string> => {
  const contractArtifacts = await hre.ethers.getContractFactory(contractName);
  const contract = await contractArtifacts.deploy();

  await contract.deployed();

  console.log(`${contractName} deployed to: ${contract.address}`);

  return contract.address;
};

const config = {
  solidity: "0.8.17",
  paths: {
    artifacts: "@artifacts",
    subgraph: "ticket-nft-subgraph",
  },
  typechain: {
    outDir: "@types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: [], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
  },
  // config subgraph
  subgraph: {
    name: "ticket-nft",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
