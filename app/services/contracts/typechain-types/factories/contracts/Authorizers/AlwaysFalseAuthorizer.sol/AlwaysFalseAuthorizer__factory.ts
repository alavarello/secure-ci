/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  AlwaysFalseAuthorizer,
  AlwaysFalseAuthorizerInterface,
} from "../../../../contracts/Authorizers/AlwaysFalseAuthorizer.sol/AlwaysFalseAuthorizer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "domain",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "addresses",
        type: "address[]",
      },
    ],
    name: "isAuthorize",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506103c7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100295760003560e01c80616e751461002e575b600080fd5b610048600480360381019061004391906102b7565b61005e565b6040516100559190610376565b60405180910390f35b600095945050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100a88261007d565b9050919050565b6100b88161009d565b81146100c357600080fd5b50565b6000813590506100d5816100af565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61012e826100e5565b810181811067ffffffffffffffff8211171561014d5761014c6100f6565b5b80604052505050565b6000610160610069565b905061016c8282610125565b919050565b600067ffffffffffffffff82111561018c5761018b6100f6565b5b610195826100e5565b9050602081019050919050565b82818337600083830152505050565b60006101c46101bf84610171565b610156565b9050828152602081018484840111156101e0576101df6100e0565b5b6101eb8482856101a2565b509392505050565b600082601f830112610208576102076100db565b5b81356102188482602086016101b1565b91505092915050565b6000819050919050565b61023481610221565b811461023f57600080fd5b50565b6000813590506102518161022b565b92915050565b600080fd5b600080fd5b60008083601f840112610277576102766100db565b5b8235905067ffffffffffffffff81111561029457610293610257565b5b6020830191508360208202830111156102b0576102af61025c565b5b9250929050565b6000806000806000608086880312156102d3576102d2610073565b5b60006102e1888289016100c6565b955050602086013567ffffffffffffffff81111561030257610301610078565b5b61030e888289016101f3565b945050604061031f88828901610242565b935050606086013567ffffffffffffffff8111156103405761033f610078565b5b61034c88828901610261565b92509250509295509295909350565b60008115159050919050565b6103708161035b565b82525050565b600060208201905061038b6000830184610367565b9291505056fea264697066735822122038105d47451e6c67386d0c45e98141e3800c2761f268fddd146a3fc31b10b5cb64736f6c63430008140033";

type AlwaysFalseAuthorizerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlwaysFalseAuthorizerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AlwaysFalseAuthorizer__factory extends ContractFactory {
  constructor(...args: AlwaysFalseAuthorizerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      AlwaysFalseAuthorizer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): AlwaysFalseAuthorizer__factory {
    return super.connect(runner) as AlwaysFalseAuthorizer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AlwaysFalseAuthorizerInterface {
    return new Interface(_abi) as AlwaysFalseAuthorizerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AlwaysFalseAuthorizer {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as AlwaysFalseAuthorizer;
  }
}