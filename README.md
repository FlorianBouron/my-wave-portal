# Wave Portal

This project demonstrates how to use web 3 on the Etherum (ETH) blockchain.
It is a chat where you can wave people and send them messages.

Disclosure: The frontend was bootstrap as an MVP and is definitely buggy and not well structured.

You can access the website with the following link: https://waveportal-starter-project.florianbouron.repl.co/

## How to deploy and use a contract?
1. Deploy the contract (check the command lines below).
2. Add your contract address to your frontend.
3. Load your ABI file to your frontend (check below).

## ABI (Application Binary Interface) File
You can find your ABI file under: `artifacts/contracts/WavePortal.sol/WavePortal.json`.
## Command lines:
### Compile our contracts:

```shell
npx hardhat compile
```

### List our local accounts:

```shell
npx hardhat accounts
```

### Run the blockchain locally:

```shell
npx hardhat node
```

### Deploy the contract to local blockchain:

```shell
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy the contract to rinkeby blockchain:

```shell
npx hardhat run scripts/deploy.js --network rinkeby
```

Try running some of the following tasks:

```shell
npx hardhat clean
npx hardhat test
npx hardhat run scripts/run.js
npx hardhat help
```
