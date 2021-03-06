const BigNumber = require('bignumber.js');
const Artifacts = require('@8xprotocol/artifacts');

const Ethereum = require('./ethereum');
const Aion = require('./aion');
const dotenv = require('dotenv');

const environment = dotenv.config().parsed;
const topUpAmount = new BigNumber(100).mul(10 ** 18);

function getAllTokens(network) {
  if (!network) {
    return;
  }

  return Artifacts.ConfigAddresses[network]['approvedTokens'].map((item) => item.address) || { address: '' };
}

function getContract(contract, network) {
  if (!network) {
      return;
  }

  let object = Artifacts.ConfigAddresses[network]['addresses'].find((item) => item.name == contract) || { address: '' };
  return object.address;
}

function getDelayPeriod() {
  return {
      processing: 0,
      catchLate: 5,
      stopChecking: 10
  }
}

function generateAddressBook(network) {
  return {
    volumeSubscriptionAddress: getContract("VolumeSubscription", network),
    transactingTokenAddresses: getAllTokens(network),
    executorAddress: getContract("Executor", network),
    transferProxyAddress: getContract("TransferProxy", network),
    payrollSubscriptionAddress: getContract("PayrollSubscription", network),
    stakeContractAddress: getContract("StakeContract", network),
    stakeTokenAddress: getContract("EightExToken", network)
  }
}

if (environment.ETHEREUM_PRIVATE_KEY) {
  Ethereum.start(
    environment.ETHEREUM_NODE_ADDRESS,
    environment.ETHEREUM_PUBLIC_KEY,
    environment.ETHEREUM_PRIVATE_KEY,
    generateAddressBook(environment.ETHEREUM_NETWORK),
    getDelayPeriod(),
    topUpAmount
  );
}

if (environment.AION_PRIVATE_KEY) {
  Aion.start(
    environment.AION_NODE_ADDRESS,
    environment.AION_PRIVATE_KEY,
    generateAddressBook(environment.AION_NETWORK),
    getDelayPeriod(),
    topUpAmount
  );
}