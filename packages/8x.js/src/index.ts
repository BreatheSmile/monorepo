import { AddressBook } from '@8xprotocol/types'

import Contracts from './helpers/contracts';
import Subscriptions from './apis/subscriptions';
import Plans from './apis/plans';

import Web3 from 'web3';

export default class EightEx {

  private web3: Web3;
  private addressBook: AddressBook;

  public contracts: Contracts;
  public subscriptions: Subscriptions;
  public plans: Plans;

  constructor(web3: Web3, addressBook: AddressBook) {
    this.web3 = web3;
    this.addressBook = addressBook;

    this.contracts = new Contracts(web3, addressBook);
    this.subscriptions = new Subscriptions(web3, this.contracts);
    this.plans = new Plans(web3, this.contracts);
  }

}