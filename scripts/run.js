const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();
    
  console.log('Contract deployed to:', waveContract.address);
  console.log('Contract deployed by:', owner.address);
  console.log('Contract address:', waveContract.address);

  const waveCount = await waveContract.getTotalWaves();
  console.log('Number of total waves: ', waveCount.toNumber());

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract balance: ',
    hre.ethers.utils.formatEther(contractBalance)
  );

  const waveTxn1 = await waveContract.wave('This is wave #1');
  await waveTxn1.wait(); // Wait for the transaction to be mined

  const waveTxn2 = await waveContract.connect(randomPerson).wave('This is wave #2');
  await waveTxn2.wait(); // Wait for the transaction to be mined

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance: ',
    hre.ethers.utils.formatEther(contractBalance)
  );

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();