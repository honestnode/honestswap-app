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
        "name": "bAsset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "bAssetIndex",
        "type": "uint8"
      }
    ],
    "name": "BassetAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "bAsset",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "BassetStatusChanged",
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
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "swapper",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "input",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "output",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "outputAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "Swapped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "bAssets",
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
    "name": "hAsset",
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
    "constant": false,
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "paused",
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
    "name": "unpause",
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
        "name": "_nexus",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_hAsset",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "_honestSavingsInterface",
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
    "constant": true,
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_bAssets",
        "type": "address[]"
      }
    ],
    "name": "getBAssetsBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "sumBalance",
        "type": "uint256"
      },
      {
        "internalType": "uint256[]",
        "name": "balances",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBasketAllBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "sumBalance",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "allBAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "balances",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBasket",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "allBAssets",
        "type": "address[]"
      },
      {
        "internalType": "uint8[]",
        "name": "statuses",
        "type": "uint8[]"
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
        "name": "_bAsset",
        "type": "address"
      }
    ],
    "name": "getBAssetStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
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
      }
    ],
    "name": "getBAssetsStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint8[]",
        "name": "",
        "type": "uint8[]"
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
        "name": "_input",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_output",
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
        "internalType": "uint256",
        "name": "outputQuantity",
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
        "name": "_input",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_output",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      }
    ],
    "name": "getSwapOutput",
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
        "internalType": "uint8",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "name": "addBAsset",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "index",
        "type": "uint8"
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
        "internalType": "uint8",
        "name": "_newStatus",
        "type": "uint8"
      }
    ],
    "name": "updateBAssetStatus",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "index",
        "type": "uint8"
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
        "name": "_integration",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_totalAmount",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "_expectAssets",
        "type": "address[]"
      }
    ],
    "name": "swapBAssets",
    "outputs": [
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
        "name": "_amounts",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256",
        "name": "_interests",
        "type": "uint256"
      }
    ],
    "name": "distributeHAssets",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
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

type GetAssetsResponse = [string[], number[]];
type GetAssetBalancesResponse = [ethers.BigNumber, ethers.BigNumber[]];

export class BasketContract extends EthereumContract {

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
      const result: GetAssetsResponse = await this._handler.getBasket();
      let tokens: BasketToken[] = [];
      for(let i = 0; i < result[0].length; ++i) {
        const asset = result[0][i];
        const available = result[1][i] === 1;
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
    const balances: GetAssetBalancesResponse = await this._handler.getBAssetsBalance(tokens.map(t => t.contract.address));
    const result: Record<string, BasketTokenBalance> = {};
    const totalBalance = new BigNumber(balances[0].toString());
    for(let i = 0; i < tokens.length; ++i) {
      const balance = new BigNumber(balances[1][i].toString()).shiftedBy(-tokens[i].decimals);
      result[tokens[i].contract.address] = {
        ...tokens[i],
        balance,
        ratio: totalBalance.isZero() ? new BigNumber(0) : balance.div(totalBalance)
      };
    }
    return result;
  }
}