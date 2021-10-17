# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

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
