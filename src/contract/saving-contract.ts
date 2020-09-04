import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const _abi = [
  // creditBalances(address: string) : BigNumber
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "creditBalances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
];

export class SavingContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, _abi, provider);
  }

  public getRawCreditBalances(address: string) : Promise<BigNumber> {
    const result : Promise<ethers.BigNumber> = this._handler.creditBalances(address);
    return result.then(r => new BigNumber(r.toString()));
  }
}