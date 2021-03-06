import { NetworkService, DelayPeriod, BasicEvent } from '../types';
import { AddressBook, Address } from '@8xprotocol/types';

import Web3 = require("web3");
import EightEx from '8x.js';
import BigNumber from '@8xprotocol/artifacts/node_modules/bignumber.js';
import { StakeContract, MockTokenContract, ExecutorAbi, ExecutorContract, PayrollSubscriptionContract, PayrollSubscriptionAbi } from '@8xprotocol/artifacts';
import { AbiDefinition } from 'ethereum-types';

export default class EthereumService implements NetworkService {

  web3: Web3;
  eightEx: EightEx;
  serviceNode: Address;

  addressBook: AddressBook;
  delayPeriod: DelayPeriod;
  
  eventsUpdated: (() => (any));

  private TX_DEFAULTS: any;
  private executorContract: ExecutorContract;

  constructor(provider: any, account: Address, addressBook: AddressBook, delayPeriod: DelayPeriod) {
    this.web3 = new Web3(provider);
    this.eightEx = new EightEx(this.web3, {});
    this.addressBook = addressBook;
    this.serviceNode = account;
    this.delayPeriod = delayPeriod;

    const DEFAULT_GAS_LIMIT: BigNumber = new BigNumber(6712390); // Default of 6.7 million gas
    const DEFAULT_GAS_PRICE: BigNumber = new BigNumber(6000000000); // 6 gEei

    this.TX_DEFAULTS = {
      from: account, // default to first account from provider
      gas: DEFAULT_GAS_LIMIT,
      gasPrice: DEFAULT_GAS_PRICE
    };
  }

  async attemptTopUp(amount: BigNumber): Promise<any> {
    
    let stakeContract = await StakeContract.at(this.addressBook.stakeContractAddress, this.web3, {});
    let stakeTokenContract = await MockTokenContract.at(this.addressBook.stakeTokenAddress, this.web3, {});

    console.log(this.serviceNode, this.addressBook.transactingTokenAddress);

    await this.asyncForEach((this.addressBook.transactingTokenAddresses || [this.addressBook.transactingTokenAddress]), async (token) => {
      let existingBalance = await stakeContract.getTotalStake.callAsync(this.serviceNode, token);

      if (existingBalance.toNumber() == amount.toNumber()) {
        console.log("Skipped top up");
        return;
      }

      let approveTx = await stakeTokenContract.approve.sendTransactionAsync(
        stakeContract.address,
        amount,
        this.TX_DEFAULTS
      );

      await this.eightEx.blockchain.awaitTransactionMinedAsync(approveTx);

      let topupTx = await stakeContract.topUpStake.sendTransactionAsync(
        amount,
        token,
        { from: this.serviceNode }
      );

      return await this.eightEx.blockchain.awaitTransactionMinedAsync(topupTx);
    });
  }

  async watchExecutor(callback: (any) => (any), fromBlock: number, toBlock: number) {

    this.executorContract = await ExecutorContract.at(this.addressBook.executorAddress, this.web3, {});

    const contract = this.web3.eth.contract(ExecutorAbi.abi as AbiDefinition[]).at(this.addressBook.executorAddress);
    const eventsWatcher = contract.allEvents({
      fromBlock: fromBlock,
      toBlock: toBlock < 0 ? 'latest' : toBlock,
    });

    eventsWatcher.watch((error, log) => {
      if (log) {  
        callback(log);
      } else {
        console.log('Empty log outputted');
      }
    });

  }

  async watchPayroll(callback: (any) => (any), fromBlock: number, toBlock: number) {

    const contract = this.web3.eth.contract(PayrollSubscriptionAbi.abi as AbiDefinition[]).at(this.addressBook.payrollSubscriptionAddress);
    const eventsWatcher = contract.allEvents({
      fromBlock: fromBlock,
      toBlock: toBlock < 0 ? 'latest' : toBlock,
    });

    eventsWatcher.watch((error, log) => {
      if (log) {  
        callback(log);
      } else {
        console.log('Empty log outputted');
      }
    });

  }

  async activate(events: BasicEvent[]): Promise<any> {

    await this.asyncForEach(events, async (event) => {
      console.log(`Sending activate tx ${JSON.stringify(event)}`);
      
      try {
        await this.executorContract.activateSubscription.sendTransactionAsync(
          event.contractAddress,
          event.paymentIdentifier,
          this.TX_DEFAULTS
        );
      } catch (error) {
        console.log(error);
      }
    });

  }

  async process(events: BasicEvent[]): Promise<any> {
    
    await this.asyncForEach(events, async (event) => {
      console.log(`Sending process tx ${JSON.stringify(event)}`);

      try {
        await this.executorContract.processSubscription.sendTransactionAsync(
          event.contractAddress,
          event.paymentIdentifier,
          this.TX_DEFAULTS
        );
      } catch (error) {
        console.log(error);
      }

    });
  }

  async catchLate(events: BasicEvent[]): Promise<any> {

    await this.asyncForEach(events, async (event) => {
      console.log(`Sending catch late tx ${JSON.stringify(event)}`);

      try {
        await this.executorContract.catchLateSubscription.sendTransactionAsync(
          event.contractAddress,
          event.paymentIdentifier,
          this.TX_DEFAULTS
        );
      } catch (error) {
        console.log(error);
      }
    });

  }

  private async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

}