import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {ERC20Contract} from './erc20-contract';
import {EthereumContract, EthereumContractProvider} from './ethereum-contract';

const abi = [
  {
    constant: true,
    inputs: [],
    name: "getBassets",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "addr",
            type: "address"
          },
          {
            internalType: "enum MassetStructs.BassetStatus",
            name: "status",
            type: "uint8"
          },
          {
            internalType: "bool",
            name: "isTransferFeeCharged",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "ratio",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maxWeight",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vaultBalance",
            type: "uint256"
          }
        ],
        internalType: "struct MassetStructs.Basset[]",
        name: "bAssets",
        type: "tuple[]"
      },
      {
        internalType: "uint256",
        name: "len",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_bAsset",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_belowPeg",
        type: "bool"
      }
    ],
    name: "handlePegLoss",
    outputs: [
      {
        internalType: "bool",
        name: "alreadyActioned",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint8",
        name: "_bAssetIndex",
        type: "uint8"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_increaseAmount",
        type: "uint256"
      }
    ],
    name: "increaseVaultBalance",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint8[]",
        name: "_bAssetIndices",
        type: "uint8[]"
      },
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "_increaseAmount",
        type: "uint256[]"
      }
    ],
    name: "increaseVaultBalances",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_nexus",
        type: "address"
      },
      {
        internalType: "address",
        name: "_mAsset",
        type: "address"
      },
      {
        internalType: "address[]",
        name: "_bAssets",
        type: "address[]"
      },
      {
        internalType: "address[]",
        name: "_integrators",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "_weights",
        type: "uint256[]"
      },
      {
        internalType: "bool[]",
        name: "_hasTransferFees",
        type: "bool[]"
      }
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "integrations",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "mAsset",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_bAsset",
        type: "address"
      }
    ],
    name: "negateIsolation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "nexus",
    outputs: [
      {
        internalType: "contract INexus",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_bAsset",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    name: "prepareForgeBasset",
    outputs: [
      {
        internalType: "bool",
        name: "isValid",
        type: "bool"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address"
              },
              {
                internalType: "enum MassetStructs.BassetStatus",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "bool",
                name: "isTransferFeeCharged",
                type: "bool"
              },
              {
                internalType: "uint256",
                name: "ratio",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxWeight",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "vaultBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MassetStructs.Basset",
            name: "bAsset",
            type: "tuple"
          },
          {
            internalType: "address",
            name: "integrator",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8"
          }
        ],
        internalType: "struct MassetStructs.BassetDetails",
        name: "bInfo",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address[]",
        name: "_bAssets",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      },
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    name: "prepareForgeBassets",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isValid",
            type: "bool"
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address"
              },
              {
                internalType: "enum MassetStructs.BassetStatus",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "bool",
                name: "isTransferFeeCharged",
                type: "bool"
              },
              {
                internalType: "uint256",
                name: "ratio",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxWeight",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "vaultBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MassetStructs.Basset[]",
            name: "bAssets",
            type: "tuple[]"
          },
          {
            internalType: "address[]",
            name: "integrators",
            type: "address[]"
          },
          {
            internalType: "uint8[]",
            name: "indexes",
            type: "uint8[]"
          }
        ],
        internalType: "struct MassetStructs.ForgePropsMulti",
        name: "props",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "prepareRedeemMulti",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "colRatio",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address"
              },
              {
                internalType: "enum MassetStructs.BassetStatus",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "bool",
                name: "isTransferFeeCharged",
                type: "bool"
              },
              {
                internalType: "uint256",
                name: "ratio",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxWeight",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "vaultBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MassetStructs.Basset[]",
            name: "bAssets",
            type: "tuple[]"
          },
          {
            internalType: "address[]",
            name: "integrators",
            type: "address[]"
          },
          {
            internalType: "uint8[]",
            name: "indexes",
            type: "uint8[]"
          }
        ],
        internalType: "struct MassetStructs.RedeemPropsMulti",
        name: "props",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "_input",
        type: "address"
      },
      {
        internalType: "address",
        name: "_output",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_isMint",
        type: "bool"
      }
    ],
    name: "prepareSwapBassets",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      },
      {
        internalType: "string",
        name: "",
        type: "string"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address"
              },
              {
                internalType: "enum MassetStructs.BassetStatus",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "bool",
                name: "isTransferFeeCharged",
                type: "bool"
              },
              {
                internalType: "uint256",
                name: "ratio",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxWeight",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "vaultBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MassetStructs.Basset",
            name: "bAsset",
            type: "tuple"
          },
          {
            internalType: "address",
            name: "integrator",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8"
          }
        ],
        internalType: "struct MassetStructs.BassetDetails",
        name: "",
        type: "tuple"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "addr",
                type: "address"
              },
              {
                internalType: "enum MassetStructs.BassetStatus",
                name: "status",
                type: "uint8"
              },
              {
                internalType: "bool",
                name: "isTransferFeeCharged",
                type: "bool"
              },
              {
                internalType: "uint256",
                name: "ratio",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxWeight",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "vaultBalance",
                type: "uint256"
              }
            ],
            internalType: "struct MassetStructs.Basset",
            name: "bAsset",
            type: "tuple"
          },
          {
            internalType: "address",
            name: "integrator",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "index",
            type: "uint8"
          }
        ],
        internalType: "struct MassetStructs.BassetDetails",
        name: "",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_assetToRemove",
        type: "address"
      }
    ],
    name: "removeBasset",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address[]",
        name: "_bAssets",
        type: "address[]"
      },
      {
        internalType: "uint256[]",
        name: "_weights",
        type: "uint256[]"
      }
    ],
    name: "setBasketWeights",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_bAsset",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_flag",
        type: "bool"
      }
    ],
    name: "setTransferFeesFlag",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

export interface BasketToken {
  symbol: string;
  contract: ERC20Contract;
  decimals: number;
}

export interface BasketTokenBalance extends BasketToken {
  ratio: BigNumber;
  balance: BigNumber;
}

export class BasketContract extends EthereumContract {

  private _tokens: Record<string, BasketToken> | undefined;

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, abi, provider);
  }

  public async getTokens(): Promise<Record<string, BasketToken>> {
    if (this._tokens === undefined) {
      const result: {
        bAssets: {
          addr: string;
          status: number;
          isTransferFeeCharged: boolean;
          ratio: ethers.BigNumber;
          maxWeight: ethers.BigNumber;
          vaultBalance: ethers.BigNumber;
        }[]
      } = await this._handler.getBassets();
      let tokens: Record<string, BasketToken> = {};
      for (const asset of result.bAssets) {
        const contract = new ERC20Contract(asset.addr, this._provider);
        const symbol = await contract.getSymbol();
        const decimals = await contract.getDecimals();
        tokens[asset.addr] = {symbol, contract, decimals};
      }
      this._tokens = tokens;
    }
    return this._tokens;
  }

  public async getToken(token: string): Promise<BasketToken> {
    const tokens = await this.getTokens();
    return tokens[token];
  }

  public async getTokenBalances(): Promise<Record<string, BasketTokenBalance>> {
    const result : {
      bAssets: {
        addr: string;
        status: number;
        isTransferFeeCharged: boolean;
        ratio: ethers.BigNumber;
        maxWeight: ethers.BigNumber;
        vaultBalance: ethers.BigNumber;
      }[]
    } = await this._handler.getBassets();
    const tokens = await this.getTokens();
    let balances: BasketTokenBalance[] = [];
    for(const asset of result.bAssets) {
      let token = tokens[asset.addr];
      if (token === undefined) {
        const contract = new ERC20Contract(asset.addr, this._provider);
        const symbol = await contract.getSymbol();
        const decimals = await contract.getDecimals();
        token = {symbol, contract, decimals};
        this._tokens && (this._tokens[asset.addr] = token);
      }
      const balance = new BigNumber(asset.vaultBalance.toString()).shiftedBy(-token.decimals);
      balances.push({
        ...token,
        balance: balance,
        ratio: new BigNumber(0)
      });
    }
    const totalBalance = balances.reduce((a, t) => a.plus(t.balance), new BigNumber(0));
    return balances.reduce((m, b) => {
      return {...m, [b.contract.address]: {...b, ratio: b.balance.div(totalBalance)}};
    }, {});
  }
}