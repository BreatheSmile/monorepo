import bus from '../bus';
import EightEx from '8x.js';
import BigNumber from 'bignumber.js';

import { getContract, getToken } from '../constants';

export default class SubscriptionStore {
  constructor() {

    this.startListeners();
    this.listenPlanHash();
    this.listenPlanRequested();

  }

  startListeners() {
    bus.on('web3:initialised', web3 => {

      this.eightEx = new EightEx(web3, {
        volumeSubscriptionAddress: getContract('VolumeSubscription'),
        transactingTokenAddress: getToken('DAI'),
        transferProxyAddress: getContract('TransferProxy'),
        executorAddress: getContract('Executor')
      });

      // Retrieve metamask account
      web3.eth.getAccounts((err, accounts) => {

        if (err != null) {
          console.log('cannot get address');
        } else if (accounts.length === 0 ) {
          console.log('you have not logged in');
        } else {

          this.address = accounts;
          this.web3 = web3;

          // Check if user has already authorized 
          this.checkAlreadyAuthorized();
          // Start listeners for subscription process
          this.authorizationRequestListener();
          this.startSubscribeListener();
          this.subscribeRequestListener();
          this.activateSubscriptionListener();
        }
      });
    });
  }

  checkAlreadyAuthorized() {
    bus.on('authorization:status', async () => {
      let authorizedStatus = await this.eightEx.subscriptions.hasGivenAuthorisation(this.address);
        if (authorizedStatus == true) {
          bus.trigger('user:authorization:received');
          console.log('The user has already given authorization');
      }
    });
  }

  listenPlanHash() {
    bus.on('planHash:sent', (planHash) => {
      this.planHash = planHash;
    });
  }

  listenPlanRequested() {
    bus.on('subscription:plan:requested', async () => {

      // Show dummy data if there's no plan hash
      if (!this.planHash) {
        bus.trigger('subscription:plan:sent', {
          logo: null,
          subscriptionName: 'Netflix [DEMO]',
          subscriptionDetails: 'Premium Plan',
          subscriptionAmount: 14,
          subscriptionPeriod: 30*24*60*60
        });
        return;
      }

      // Get the actual plan using the planHash passed in
      let planData = await this.eightEx.plans.get(
        this.planHash
      );
      
      if(planData) {
        const currencyBase = new BigNumber(10).pow(18);
        const planObj = (({ image, name, description, amount, interval }) => ({
          logo: image,
          subscriptionName: name,
          subscriptionDetails: description,
          subscriptionAmount: amount.div(currencyBase).toNumber(),
          subscriptionPeriod: interval
        }))(planData);
        bus.trigger('subscription:plan:sent', planObj);
      }
    });
  };

  authorizationRequestListener() {
    bus.on('user:authorization:requested', async () => {
      bus.trigger('loading:state');
      try {
        let authorizationTxHash = await this.eightEx.subscriptions.giveAuthorisation(
        );

        let authorizationStatus = await this.eightEx.blockchain.awaitTransactionMinedAsync(
          authorizationTxHash
        ); 

        if(authorizationStatus) {
          bus.trigger('user:authorization:received', true);
        }
        
      } catch (error) {
        bus.trigger('authorization:process:failed', error);
        console.log(error);
      }
    });
  };

  subscribeRequestListener() {
    bus.on('user:subscribe:requested', async () => {
      try {
        let hasUserGivenAuthorization = await this.eightEx.subscriptions.hasGivenAuthorisation(this.address);

        if(hasUserGivenAuthorization === true) {
          bus.trigger('start:subscribe:process');
        } else {
          bus.trigger('authorization:process:failed');
          console.log('Authorization not given, please authorize first');
        }
      } catch (error) {
        console.log('Something went wrong with hasGivenAuthorisation' + ' ' + error); 
      }
    });
  }

  startSubscribeListener() {
    bus.on('start:subscribe:process', async () => {
      bus.trigger('loading:state');
      const txData = null;
      const metaData = null;

      try {
        this.subscriptionHash = await this.eightEx.subscriptions.subscribe(this.planHash, metaData, txData);
        
        if(this.subscriptionHash) {
          bus.trigger('user:subscribe:completed', this.subscriptionHash);
        }
        
      } catch (error) {
        bus.trigger('subscription:process:failed');
        console.log(error);
      }
    });
  }

  activateSubscriptionListener() {
    bus.on('user:activate:requested', async () => {
      bus.trigger('loading:state');
      const txData = null;
      if (this.subscriptionHash) {
        try {
          let activationTxHash = await this.eightEx.subscriptions.activate(this.subscriptionHash, txData);

          let activationStatus = await this.eightEx.blockchain.awaitTransactionMinedAsync(
            activationTxHash
          ); 

          if(activationStatus) {
            bus.trigger('user:activate:completed', this.subscriptionHash);
            console.log('Subscription receipt is' + ' ' + activationTxHash);
          }
          
        } catch (error) {
          bus.trigger('activation:process:failed'); 
          console.log(error);
        }
      };
    });
  }
};