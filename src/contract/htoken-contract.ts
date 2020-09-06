import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {erc20Abi, ERC20Contract} from './erc20-contract';
import {EthereumContractProvider} from './ethereum-contract';

const abi = [
  ...erc20Abi,

  // mint(token: string, amount: BigNumber) : BigNumber
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_basset',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '_bassetQuantity',
        'type': 'uint256'
      }
    ],
    'name': 'mint',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'hAssetMinted',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // mintMulti(tokens: string[], amounts: BigNumber[], string: address): BigNumber
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address[]',
        'name': '_bAssets',
        'type': 'address[]'
      },
      {
        'internalType': 'uint256[]',
        'name': '_bassetQuantity',
        'type': 'uint256[]'
      },
      {
        'internalType': 'address',
        'name': '_recipient',
        'type': 'address'
      }
    ],
    'name': 'mintMulti',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'hAssetMinted',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // redeem(token: string, amount: BigNumber):BigNumber
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address',
        'name': '_basset',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '_bassetQuantity',
        'type': 'uint256'
      }
    ],
    'name': 'redeem',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'hAssetRedeemed',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // redeemHasset(amount: BigNumber, address: string): []
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_mAssetQuantity',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': '_recipient',
        'type': 'address'
      }
    ],
    'name': 'redeemHasset',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // redeemMulti(tokens: string[], amounts: BigNumber[], address: string): BigNumber
  {
    'constant': false,
    'inputs': [
      {
        'internalType': 'address[]',
        'name': '_bAssets',
        'type': 'address[]'
      },
      {
        'internalType': 'uint256[]',
        'name': '_bassetQuantities',
        'type': 'uint256[]'
      },
      {
        'internalType': 'address',
        'name': '_recipient',
        'type': 'address'
      }
    ],
    'name': 'redeemMulti',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'hAssetRedeemed',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export class HTokenContract extends ERC20Contract {
  constructor(address: string, provider: EthereumContractProvider) {
    super(address, provider, abi);
  }

  public async mint(token: string, amount: BigNumber): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const finalAmount = amount.shiftedBy(decimals);
    const result: Promise<ethers.BigNumber> = this._handler.mint(token, ethers.BigNumber.from(finalAmount.toString()));
    return result.then(a => new BigNumber(a.toString()).shiftedBy(-decimals));
  }

  public async mintMulti(amounts: Record<string, BigNumber>): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.mintMulti(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
    return result.then(a => new BigNumber(a.toString()).shiftedBy(-decimals));
  }

  public async redeemProportionally(amount: BigNumber): Promise<void> {
    const decimals = await this.getDecimals();
    return this._handler.redeemHasset(ethers.BigNumber.from(amount.shiftedBy(decimals)));
  }

  public async redeemManually(amounts: Record<string, BigNumber>): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.redeemMulti(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
    return result.then(a => new BigNumber(a.toString()).shiftedBy(-decimals));
  }
}