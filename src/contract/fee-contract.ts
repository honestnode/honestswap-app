import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const abi = [
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'WhitelistAdminAdded',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'WhitelistAdminRemoved',
    'type': 'event'
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'addWhitelistAdmin',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'internalType': 'address',
        'name': 'account',
        'type': 'address'
      }
    ],
    'name': 'isWhitelistAdmin',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'renounceWhitelistAdmin',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_hAssetContract',
        'type': 'address'
      }
    ],
    'name': 'initialize',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_newFeeRate',
        'type': 'uint256'
      }
    ],
    'name': 'setSwapFeeRate',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_newFeeRate',
        'type': 'uint256'
      }
    ],
    'name': 'setRedeemFeeRate',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'swapFeeRate',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'redeemFeeRate',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalFee',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_account',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'reward',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export class HonestFeeContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, abi, provider);
  }

  public async redeemFeeRate(): Promise<BigNumber> {
    const request: Promise<ethers.BigNumber> = this._handler.redeemFeeRate();
    return request.then(v => new BigNumber(v.toString()));
  }

  public async swapFeeRate(): Promise<BigNumber> {
    const request: Promise<ethers.BigNumber> = this._handler.swapFeeRate();
    return request.then(v => new BigNumber(v.toString()));
  }
}