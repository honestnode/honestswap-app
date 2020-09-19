import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const _abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      }
    ],
    "name": "SavingsDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "SavingsRedeemed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TestAmount",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "WhitelistAdminAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "WhitelistAdminRemoved",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "addWhitelistAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isWhitelistAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceWhitelistAdmin",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_hAssetContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_basketContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_investmentContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_feeContract",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_bonusContract",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_hAssetContract",
        "type": "address"
      }
    ],
    "name": "setHAssetContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_basketContract",
        "type": "address"
      }
    ],
    "name": "setBasketContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_investmentContract",
        "type": "address"
      }
    ],
    "name": "setInvestmentIntegrationContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_feeContract",
        "type": "address"
      }
    ],
    "name": "setFeeContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_bonusContract",
        "type": "address"
      }
    ],
    "name": "setBonusContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "hAssetContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "basketContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "investmentIntegrationContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "feeContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "bonusContract",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "savingsOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "sharesOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSavings",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalShares",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "sharePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "updateApy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "apy",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_account",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_borrows",
        "type": "uint256[]"
      },
      {
        "internalType": "address[]",
        "name": "_sAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_supplies",
        "type": "uint256[]"
      }
    ],
    "name": "swap",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "investments",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      }
    ],
    "name": "investmentOf",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export class SavingContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, _abi, provider);
  }

  public async estimateDepositGas(amount: BigNumber) : Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas.deposit(ethers.BigNumber.from(amount.toString()));
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async estimateWithdrawGas(amount: BigNumber) : Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas.withdraw(ethers.BigNumber.from(amount.toString()));
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async depositRaw(amount: BigNumber): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.deposit(ethers.BigNumber.from(amount.toString()));
    return result.then(r => new BigNumber(r.toString()));
  }

  public async withdrawRaw(amount: BigNumber): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.withdraw(ethers.BigNumber.from(amount.toString()));
    return result.then(r => new BigNumber(r.toString()));
  }

  public getTotalBalance() : Promise<BigNumber> {
    const result : Promise<ethers.BigNumber> = this._handler.totalValue();
    return result.then(r => new BigNumber(r.toString()).shiftedBy(-18));
  }

  public getApy() : Promise<BigNumber> {
    const result : Promise<ethers.BigNumber> = this._handler.apy();
    return result.then(r => new BigNumber(r.toString()).shiftedBy(-18));
  }

  public sharesOf(account: string): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.sharesOf(account);
    return result.then(r => new BigNumber(r.toString()).shiftedBy(-18));
  }

  public totalShares(): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.totalShares();
    return result.then(r => new BigNumber(r.toString()).shiftedBy(-18));
  }

  public savingsOf(account: string): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.savingsOf(account);
    return result.then(r => new BigNumber(r.toString()).shiftedBy(-18));
  }
}