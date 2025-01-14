import { task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@graphprotocol/hardhat-graph';

task('deploy', 'Deploys the passed contract').setAction(
  async (taskArgs, hre) => {
    await hre.run('compile');

    // Contract event
    const eventArtifacts = await hre.ethers.getContractFactory('Event');
    const eventContract = await eventArtifacts.deploy();
    const addressEvent = eventContract.address;
    const eventContractName = 'Event';
    console.log(`Contract Event deployed to: ${addressEvent}`);
    // approve event manager
    const contract = eventArtifacts.attach(addressEvent);
    contract.approveOrDisableEventManager(
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      true
    );

    const ticketTypeArtifacts = await hre.ethers.getContractFactory(
      'TicketType'
    );
    const ticketTypeContract = await ticketTypeArtifacts.deploy(addressEvent);
    const addressTicketType = ticketTypeContract.address;
    const ticketTypeContractName = 'TicketType';
    console.log(`Contract TicketType deployed to: ${addressTicketType}`);

    const ticketArtifacts = await hre.ethers.getContractFactory('Ticket');
    const ticketContract = await ticketArtifacts.deploy(
      addressEvent,
      addressTicketType
    );
    const addressTicket = ticketContract.address;
    const ticketContractName = 'Ticket';
    console.log(`Contract Ticket deployed to: ${addressTicket}`);

    await hre.run('graph', {
      address: addressEvent,
      contractName: eventContractName,
    });
    await hre.run('graph', {
      address: addressTicketType,
      contractName: ticketTypeContractName,
    });
    await hre.run('graph', {
      address: addressTicket,
      contractName: ticketContractName,
    });
  }
);

const config = {
  solidity: '0.8.17',
  paths: {
    artifacts: '@artifacts',
    subgraph: 'ticket-nft-subgraph',
  },
  typechain: {
    outDir: '@types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: [], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
  },
  // config subgraph
  subgraph: {
    name: 'ticket-nft',
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
