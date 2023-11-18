/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ReportContractSchemaResolver,
  ReportContractSchemaResolverInterface,
} from "../../../contracts/secure-ci/ReportContractSchemaResolver";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IEAS",
        name: "eas",
        type: "address",
      },
      {
        internalType: "contract ISecureCIRegistry",
        name: "secureCIRegistry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientValue",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidEAS",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidLength",
    type: "error",
  },
  {
    inputs: [],
    name: "NotPayable",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "ContractReported",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "schema",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "time",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "revocationTime",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "refUID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "attester",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Attestation",
        name: "attestation",
        type: "tuple",
      },
    ],
    name: "attest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "isPayable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "schema",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "time",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "revocationTime",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "refUID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "attester",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Attestation[]",
        name: "attestations",
        type: "tuple[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "multiAttest",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "schema",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "time",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "revocationTime",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "refUID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "attester",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Attestation[]",
        name: "attestations",
        type: "tuple[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "multiRevoke",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "uid",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "schema",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "time",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "expirationTime",
            type: "uint64",
          },
          {
            internalType: "uint64",
            name: "revocationTime",
            type: "uint64",
          },
          {
            internalType: "bytes32",
            name: "refUID",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "address",
            name: "attester",
            type: "address",
          },
          {
            internalType: "bool",
            name: "revocable",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct Attestation",
        name: "attestation",
        type: "tuple",
      },
    ],
    name: "revoke",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x61014060405234801561001157600080fd5b50604051610bda380380610bda8339810160408190526100309161009e565b6001608052600360a052600060c052816001600160a01b038116610067576040516341bc07ff60e11b815260040160405180910390fd5b6001600160a01b0390811660e0529182166101205216610100526100d8565b6001600160a01b038116811461009b57600080fd5b50565b600080604083850312156100b157600080fd5b82516100bc81610086565b60208401519092506100cd81610086565b809150509250929050565b60805160a05160c05160e0516101005161012051610ab661012460003960005050600061059c015260006104d20152600061019901526000610170015260006101470152610ab66000f3fe6080604052600436106100695760003560e01c8063ce46e04611610043578063ce46e04614610106578063e49617e11461011a578063e60c35051461012d57600080fd5b806354fd4d50146100a557806388e5b2d9146100d057806391db0b7e146100f357600080fd5b366100a0576040517f1574f9f300000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080fd5b3480156100b157600080fd5b506100ba610140565b6040516100c7919061077b565b60405180910390f35b6100e36100de366004610818565b6101e3565b60405190151581526020016100c7565b6100e3610101366004610818565b6102e4565b34801561011257600080fd5b5060006100e3565b6100e3610128366004610884565b6103d5565b6100e361013b366004610884565b6103e8565b606061016b7f00000000000000000000000000000000000000000000000000000000000000006103fc565b6101947f00000000000000000000000000000000000000000000000000000000000000006103fc565b6101bd7f00000000000000000000000000000000000000000000000000000000000000006103fc565b6040516020016101cf939291906108c7565b604051602081830303815290604052905090565b60006101ed6104ba565b83828114610227576040517f947d5a8400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3460005b828110156102d45760008686838181106102475761024761093d565b9050602002013590508281111561028a576040517f1101129400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102b789898481811061029f5761029f61093d565b90506020028101906102b1919061096c565b50600190565b6102c85760009450505050506102dc565b9091039060010161022b565b506001925050505b949350505050565b60006102ee6104ba565b83828114610328576040517f947d5a8400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3460005b828110156102d45760008686838181106103485761034861093d565b9050602002013590508281111561038b576040517f1101129400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103b88989848181106103a0576103a061093d565b90506020028101906103b2919061096c565b8261052b565b6103c95760009450505050506102dc565b9091039060010161032c565b60006103df6104ba565b60015b92915050565b60006103f26104ba565b6103e2823461052b565b6060600061040983610675565b600101905060008167ffffffffffffffff811115610429576104296109aa565b6040519080825280601f01601f191660200182016040528015610453576020820181803683370190505b5090508181016020015b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461045d57509392505050565b3373ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001614610529576040517f4ca8886700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b6000808061053d6101208601866109d9565b81019061054a9190610a3e565b6040517f737547060000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff80831660248301529294509092507f0000000000000000000000000000000000000000000000000000000000000000909116906373754706906044016020604051808303816000875af11580156105e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060b9190610a87565b61061a576000925050506103e2565b8073ffffffffffffffffffffffffffffffffffffffff167f69ad248996b00b10c2c4a06265a15c88f1c493044ef118685d5d14641c9073228360405161066291815260200190565b60405180910390a2506001949350505050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106106be577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef810000000083106106ea576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061070857662386f26fc10000830492506010015b6305f5e1008310610720576305f5e100830492506008015b612710831061073457612710830492506004015b60648310610746576064830492506002015b600a83106103e25760010192915050565b60005b8381101561077257818101518382015260200161075a565b50506000910152565b602081526000825180602084015261079a816040850160208701610757565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60008083601f8401126107de57600080fd5b50813567ffffffffffffffff8111156107f657600080fd5b6020830191508360208260051b850101111561081157600080fd5b9250929050565b6000806000806040858703121561082e57600080fd5b843567ffffffffffffffff8082111561084657600080fd5b610852888389016107cc565b9096509450602087013591508082111561086b57600080fd5b50610878878288016107cc565b95989497509550505050565b60006020828403121561089657600080fd5b813567ffffffffffffffff8111156108ad57600080fd5b820161014081850312156108c057600080fd5b9392505050565b600084516108d9818460208901610757565b80830190507f2e000000000000000000000000000000000000000000000000000000000000008082528551610915816001850160208a01610757565b60019201918201528351610930816002840160208801610757565b0160020195945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec18336030181126109a057600080fd5b9190910192915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610a0e57600080fd5b83018035915067ffffffffffffffff821115610a2957600080fd5b60200191503681900382131561081157600080fd5b60008060408385031215610a5157600080fd5b82359150602083013573ffffffffffffffffffffffffffffffffffffffff81168114610a7c57600080fd5b809150509250929050565b600060208284031215610a9957600080fd5b815180151581146108c057600080fdfea164736f6c6343000814000a";

type ReportContractSchemaResolverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReportContractSchemaResolverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ReportContractSchemaResolver__factory extends ContractFactory {
  constructor(...args: ReportContractSchemaResolverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    eas: AddressLike,
    secureCIRegistry: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(eas, secureCIRegistry, overrides || {});
  }
  override deploy(
    eas: AddressLike,
    secureCIRegistry: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(eas, secureCIRegistry, overrides || {}) as Promise<
      ReportContractSchemaResolver & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): ReportContractSchemaResolver__factory {
    return super.connect(runner) as ReportContractSchemaResolver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReportContractSchemaResolverInterface {
    return new Interface(_abi) as ReportContractSchemaResolverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ReportContractSchemaResolver {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ReportContractSchemaResolver;
  }
}