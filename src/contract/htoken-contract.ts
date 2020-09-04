import {erc20Abi, ERC20Contract} from './erc20-contract';
import {EthereumContractProvider} from './ethereum-contract';

const abi = [
  ...erc20Abi,
  // collectInterest() : {totalInterestGained, newSupply}
  {
    constant: false,
    inputs: [],
    name: "collectInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "totalInterestGained",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "newSupply",
        type: "uint256"
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
        internalType: "address",
        name: "_bAsset",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_bAssetQuantity",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "massetMinted",
        type: "uint256"
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
        name: "_bAssetQuantity",
        type: "uint256[]"
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address"
      }
    ],
    name: "mintMulti",
    outputs: [
      {
        internalType: "uint256",
        name: "massetMinted",
        type: "uint256"
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
        internalType: "address",
        name: "_bAsset",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_bAssetQuantity",
        type: "uint256"
      }
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "massetRedeemed",
        type: "uint256"
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
        internalType: "uint256",
        name: "_mAssetQuantity",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address"
      }
    ],
    name: "redeemMasset",
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
        name: "_bAssetQuantities",
        type: "uint256[]"
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address"
      }
    ],
    name: "redeemMulti",
    outputs: [
      {
        internalType: "uint256",
        name: "massetRedeemed",
        type: "uint256"
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
        internalType: "uint256",
        name: "_quantity",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address"
      }
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "output",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
];

export class HTokenContract extends ERC20Contract {
  constructor(address: string, provider: EthereumContractProvider) {
    super(address, provider, abi);
  }
}