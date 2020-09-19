import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const _abi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_inputBAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_outputBAsset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_recipient",
        "type": "address"
      }
    ],
    "name": "swap",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "outputQuantity",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export class SwapContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, _abi, provider);
  }

  public swap(fromToken: string, toToken: string, amount: BigNumber) : Promise<any[]> {
    return this._handler.swap(fromToken, toToken, ethers.BigNumber.from(amount.toString()));
  }
}