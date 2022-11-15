# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat console
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Sample Subgraph Command

This project demonstrates a basic graph-cli use case. It comes with a sample subgraph, a test for that subgraph, and a script that build deploys that subgraph.

Try running some of the following tasks:

```shell
npx graph codegen
npx graph build
```

# Hardhat-graph Demo

A repository demonstrating how the [hardhat-graph](https://github.com/graphprotocol/hardhat-graph) plugin can be used to allow devs to simultaniously develop and test their contracts and subgraphs, and how to index their contract by running local grah node against a local hardhat node.

# Prequisites:

1. Run `yarn` or `npm install` to install the dependencies

# How to index the contract on localhost network:

1. You will need 3 terminal windows/tabs open
2. Run hardhat node `yarn hardhat-local` or `npm run hardhat-local`
3. Run graph node `yarn graph-local` or `npm run graph-local`
4. Compile & Deploy the contracts:

- `npx hrdhat deploy --contract-name Event`
- `npx hardhat deploy --contract-name TicketType`

_NOTE: You can check the `deploy` task in the [hardhat.config.ts](https://github.com/dimitrovmaksim/hardhat-graph-demo/blob/main/hardhat.config.ts#L11) file. After compiling and deploying the contract to the local hardhat node, it will execute the built-in `graph` task from the hardhat-graph plugin. In this case it will update the abi's in the subgraph folder(ticket-nft-subgraph), it will update the networks.json file with the addresses of the deployed contracts. You'll get a warning informing you that there are differences between the events in your contract's ABI and the subgraph.yaml (In this case we don't want to index all the events so we can ignore the warning) If you make any changes to the subgraph.yaml or schema.graphql files, you will have to run the `codegen` command in order to update the generated files. You can check more info about what each `hardhat-graph` command does here: https://github.com/graphprotocol/hardhat-graph#tasks. This is only an example usage, you can create your own workflow that better suites your needs._

5. Run `yarn graph-codegen` or `npm run graph-codegen`
   In order to make it easy and type-safe to work with smart contracts, events and entities, the Graph CLI can generate AssemblyScript types from the subgraph's GraphQL schema and the contract ABIs included in the data sources.
   Run after change compile contract (change abi) or change graphql schema

6. Create a subgraph on the local graph node by running `yarn create-local` or `npm run create-local`
7. Compile & Deploy the subgraph on the local graph node by running `yarn deploy-local` or `npm run deploy-local`
8. You can query the subgraph by opening the following url in your browser `http://127.0.0.1:8000/subgraphs/name/ticket-nft/graphql`
9. Build graph query type after change query.graphql file `npx graphclient build`
   NOTE: If for any reason you stop the hardhat node, it is recommended to stop the graph node, delete the `ipfs` and `postgres` folders in `data` (or the whole `data` folder) created by the graph node (you can run `yarn graph-local-clean` that will do that for you), and repeat steps `2-8`.
