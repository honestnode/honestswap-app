import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {ERC20Contract} from './erc20-contract';
import {EthereumContractProvider} from './ethereum-contract';

const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "minter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hAssetQuantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "bAsset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "bAssetQuantity",
        "type": "uint256"
      }
    ],
    "name": "Minted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "minter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hAssetQuantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "bAssets",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "bAssetQuantities",
        "type": "uint256[]"
      }
    ],
    "name": "MintedMulti",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "asset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "feeQuantity",
        "type": "uint256"
      }
    ],
    "name": "PaidFee",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hAssetQuantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "bAssets",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "bAssetQuantities",
        "type": "uint256[]"
      }
    ],
    "name": "Redeemed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hAssetQuantity",
        "type": "uint256"
      }
    ],
    "name": "RedeemedHAsset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "RedemptionFeeChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
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
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "nexus",
    "outputs": [
      {
        "internalType": "contract INexus",
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
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
        "internalType": "string",
        "name": "_nameArg",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbolArg",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_nexus",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_honestBasketInterface",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_honestSavingsInterface",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_honestBonusInterface",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_honestFeeInterface",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_bAssetValidator",
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
        "name": "_bAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_bAssetQuantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "hAssetMinted",
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
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_bAssetQuantity",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "mintMultiTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "hAssetMinted",
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
        "internalType": "address",
        "name": "_bAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_bAssetQuantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "redeemTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "hAssetRedeemed",
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
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_bAssetQuantities",
        "type": "uint256[]"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "redeemMultiTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "hAssetRedeemed",
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
        "name": "_bAssetQuantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "redeemMultiInProportionTo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "hAssetRedeemed",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_getBasketAddress",
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
  }
];

export class HTokenContract extends ERC20Contract {
  constructor(address: string, provider: EthereumContractProvider) {
    super(address, provider, abi);
  }

  public async estimateMintMultiTo(amounts: Record<string, BigNumber>, account: string) : Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas.mintMultiTo(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())), account);
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async mintTo(token: string, amount: BigNumber): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const finalAmount = amount.shiftedBy(decimals);
    const result: Promise<ethers.BigNumber> = this._handler.mint(token, ethers.BigNumber.from(finalAmount.toString()));
    return result.then(a => new BigNumber(a.toString()).shiftedBy(-decimals));
  }

  public async mintMultiTo(amounts: Record<string, BigNumber>, account: string): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.mintMultiTo(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())), account);
    return result.then(a => new BigNumber(a.toString()).shiftedBy(-decimals));
  }

  public async estimateRedeemProportionally(amount: BigNumber, account: string) : Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas.redeemMultiInProportionTo(ethers.BigNumber.from(amount.shiftedBy(decimals).toString()), account);
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async redeemProportionally(amount: BigNumber, account: string): Promise<void> {
    const decimals = await this.getDecimals();
    return this._handler.redeemMultiInProportionTo(ethers.BigNumber.from(amount.shiftedBy(decimals).toString()), account);
  }

  public async estimateRedeemManually(amounts: Record<string, BigNumber>, account: string) : Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas.redeemMultiTo(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.shiftedBy(decimals).toString())), account);
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async redeemManually(amounts: Record<string, BigNumber>, account: string): Promise<void> {
    const decimals = await this.getDecimals();
    return this._handler.redeemMultiTo(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.shiftedBy(decimals).toString())), account);
  }
}