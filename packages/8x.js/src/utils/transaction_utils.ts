import * as Web3 from 'web3';

import { Web3Utils } from '@8xprotocol/artifacts';
import { TxData } from '@8xprotocol/types';
import { DEFAULT_GAS_LIMIT, DEFAULT_GAS_PRICE } from '../constants';

export interface TransactionMiningOpts {
  interval: number;
  ensureNotUncle: boolean;
}

export async function generateTxOpts(
  web3: Web3,
  txOpts?: TxData,
): Promise<TxData> {
  const web3Utils = new Web3Utils(web3);
  const accounts = await web3Utils.getAvailableAddressesAsync();

  return {
    from: accounts[0], // default to first account from provider
    gas: DEFAULT_GAS_LIMIT,
    gasPrice: DEFAULT_GAS_PRICE,
    ...txOpts,
  };
}

export async function awaitTx(
  web3: Web3,
  txHash: string,
  options?: TransactionMiningOpts,
): Promise<any> {
  const web3Utils = new Web3Utils(web3);

  const interval: number = options && options.interval ? options.interval : 500;
  const transactionReceiptAsync = async function(txHash: string, resolve: Function, reject: Function) {
    try {
      const receipt = await web3Utils.getTransactionReceiptAsync(txHash);
      if (!receipt) {
        setTimeout(function () {
          transactionReceiptAsync(txHash, resolve, reject);
        }, interval);
      } else {
        if (options && options.ensureNotUncle) {
          const resolvedReceipt = receipt;

          if (!resolvedReceipt || !resolvedReceipt.blockNumber) {
            setTimeout(function () {
              transactionReceiptAsync(txHash, resolve, reject);
            }, interval);
          } else {
            try {
              const block = await web3.eth.getBlock(resolvedReceipt.blockNumber);
              const current = await web3.eth.getBlock('latest');

              if (current.number - block.number >= 12) {
                const txn = await web3.eth.getTransaction(txHash);
                if (txn.blockNumber) {
                  resolve(resolvedReceipt);
                } else {
                  reject(new Error('Transaction with hash: ' + txHash + ' ended up in an uncle block.'));
                }
              } else {
                setTimeout(function () {
                  transactionReceiptAsync(txHash, resolve, reject);
                }, interval);
              }
            } catch (e) {
              setTimeout(function () {
                transactionReceiptAsync(txHash, resolve, reject);
              }, interval);
            }
          }
        } else {
          resolve(receipt);
        }
      }
    } catch (e) {
      reject(e);
    }
  };

  if (Array.isArray(txHash)) {
    const promises: Promise<string>[] = [];
    txHash.forEach(function (oneTxHash) {
      promises.push(awaitTx(web3, oneTxHash, options));
    });

    return Promise.all(promises);
  } else {
    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txHash, resolve, reject);
    });
  }
}
