import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {ERC20Contract} from './erc20-contract';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const abi = [
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
        "name": "honestAsset",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "honestSavings",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "bAssets",
        "type": "address[]"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "honestAsset",
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
    "name": "honestSavings",
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
    "name": "basketAssets",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "bool[]",
        "name": "",
        "type": "bool[]"
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "setHonestAsset",
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "setHonestSavings",
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "addBasketAsset",
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "removeBasketAsset",
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "activateBasketAsset",
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
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "deactivateBasketAsset",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      }
    ],
    "name": "isAssetsAllActive",
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
        "name": "bAsset",
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
    "name": "balances",
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
      },
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
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "enum IHonestVault.Repository",
        "name": "repository",
        "type": "uint8"
      }
    ],
    "name": "distributeProportionally",
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
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "assets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "enum IHonestVault.Repository",
        "name": "repository",
        "type": "uint8"
      }
    ],
    "name": "distributeManually",
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
        "name": "bAsset",
        "type": "address"
      },
      {
        "internalType": "enum IHonestVault.Repository",
        "name": "repository",
        "type": "uint8"
      }
    ],
    "name": "_balanceOf",
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
        "internalType": "enum IHonestVault.Repository",
        "name": "repository",
        "type": "uint8"
      }
    ],
    "name": "_balances",
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
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

export interface BasketToken {
  available: boolean;
  symbol: string;
  contract: ERC20Contract;
  decimals: number;
}

export interface BasketTokenBalance extends BasketToken {
  ratio: BigNumber;
  balance: BigNumber;
}

type GetAssetsResponse = [string[], boolean[]];
type GetAssetBalancesResponse = [string[], ethers.BigNumber[], ethers.BigNumber];

export class VaultContract extends EthereumContract {

  private _tokens: BasketToken[] | undefined;
  private _tokensRecord: Record<string, BasketToken> | undefined;

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, abi, provider);
  }

  public async getTokens(): Promise<Record<string, BasketToken>> {
    if (this._tokensRecord === undefined) {
      const tokens: BasketToken[] = await this.getTokensRemote();
      this._tokensRecord = tokens.reduce((pv, nv) => (
        {...pv, [nv.symbol]: nv}
      ), {});
    }
    return this._tokensRecord;
  }

  public async getToken(token: string): Promise<BasketToken> {
    const tokens = await this.getTokens();
    return tokens[token];
  }

  private async getTokensRemote(): Promise<BasketToken[]> {
    if (this._tokens === undefined) {
      const result: GetAssetsResponse = await this._handler.basketAssets();
      let tokens: BasketToken[] = [];
      for(let i = 0; i < result[0].length; ++i) {
        const asset = result[0][i];
        const available = result[1][i];
        const contract = new ERC20Contract(asset, this._provider);
        const symbol = await contract.getSymbol();
        const decimals = await contract.getDecimals();
        const token = {available, symbol, contract, decimals};
        tokens.push(token);
      }
      this._tokens = tokens;
    }
    return this._tokens;
  }

  public async getTokenBalances(): Promise<Record<string, BasketTokenBalance>> {
    const tokens: BasketToken[] = await this.getTokensRemote();
    const balances: GetAssetBalancesResponse = await this._handler.balances();
    const result: Record<string, BasketTokenBalance> = {};
    const totalBalance = new BigNumber(balances[2].toString());
    for(let i = 0; i < tokens.length; ++i) {
      const balance = new BigNumber(balances[1][i].toString());
      result[tokens[i].symbol] = {
        ...tokens[i],
        balance: balance.shiftedBy(-18),
        ratio: totalBalance.isZero() ? new BigNumber(0) : balance.div(totalBalance)
      };
    }
    return result;
  }

  public async getTokenBalance(symbol: string): Promise<BigNumber> {
    const token = await this.getToken(symbol);
    const balance: ethers.BigNumber = await this._handler.balanceOf(token.contract.address);
    return new BigNumber(balance.toString()).shiftedBy(-18);
  }
}