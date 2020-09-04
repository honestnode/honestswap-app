import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractInterface, EthereumContractProvider} from './ethereum-contract';

export const erc20Abi = [
  // name(): string
  {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },

  // approve(string, BigNumber): boolean
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // totalSupply(): BigNumber
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },

  // transferFrom(string, string, BigNumber): boolean
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address'
      },
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // decimals(): number
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'name': '',
        'type': 'uint8'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },

  // balanceOf(string): BigNumber
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': 'balance',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },

  // symbol(): string
  {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },

  // transfer(string, BigNumber): boolean
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },

  // allowance(string, string): BigNumber
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      },
      {
        'name': '_spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'payable': true,
    'stateMutability': 'payable',
    'type': 'fallback'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  }
];

export class ERC20Contract extends EthereumContract {

  private _name: string | undefined;
  private _symbol: string | undefined;
  private _decimals: number | undefined;

  constructor(address: string, provider: EthereumContractProvider, abi?: EthereumContractInterface) {
    super(address, abi || erc20Abi, provider);
  }

  public getName(): Promise<string> {
    if (this._name !== undefined) {
      return Promise.resolve(this._name);
    }
    return this._handler.name();
  }

  public getSymbol(): Promise<string> {
    if (this._symbol !== undefined) {
      return Promise.resolve(this._symbol);
    }
    return this._handler.symbol();
  }

  public async getIcon(): Promise<string> {
    const symbol = await this.getSymbol();
    return `/assets/icon/${symbol.toLowerCase()}.svg`;
  }

  public getDecimals(): Promise<number> {
    if (this._decimals !== undefined) {
      return Promise.resolve(this._decimals);
    }
    return this._handler.decimals();
  }

  public async getTotalSupply(): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.totalSupply();
    return result.then(n => new BigNumber(n.toString()).shiftedBy(-decimals));
  }

  public async getBalance(address: string): Promise<BigNumber>{
    return Promise.resolve(new BigNumber(100));
    // const decimals = await this.getDecimals();
    // const result: Promise<ethers.BigNumber> = this._handler.balanceOf(address);
    // return result.then(n => new BigNumber(n.toString()).shiftedBy(-decimals));
  }
}