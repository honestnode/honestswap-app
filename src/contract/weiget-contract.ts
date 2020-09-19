import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const _abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weight",
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
        "name": "_saver",
        "type": "address"
      }
    ],
    "name": "getWeight",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "weight",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];

export class WeightContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, _abi, provider);
  }

  public getTotalWeight(): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.getTotalWeight();
    return result.then(r => new BigNumber(r.toString()));
  }

  public getWeight(address: string): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.getWeight(address);
    return result.then(r => new BigNumber(r.toString()));
  }
}