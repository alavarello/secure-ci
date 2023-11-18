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
import type { NonPayableOverrides } from "../../../common";
import type {
  AlwaysFalseAuthorizer,
  AlwaysFalseAuthorizerInterface,
} from "../../../contracts/Authorizers/AlwaysFalseAuthorizer";

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
  "0x608060405234801561001057600080fd5b50610213806100206000396000f3fe608060405234801561001057600080fd5b50600436106100295760003560e01c80616e751461002e575b600080fd5b61004761003c3660046100d6565b600095945050505050565b604051901515815260200160405180910390f35b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008083601f84011261009c57600080fd5b50813567ffffffffffffffff8111156100b457600080fd5b6020830191508360208260051b85010111156100cf57600080fd5b9250929050565b6000806000806000608086880312156100ee57600080fd5b853573ffffffffffffffffffffffffffffffffffffffff8116811461011257600080fd5b9450602086013567ffffffffffffffff8082111561012f57600080fd5b818801915088601f83011261014357600080fd5b8135818111156101555761015561005b565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561019b5761019b61005b565b816040528281528b60208487010111156101b457600080fd5b826020860160208301376000602084830101528098505050506040880135945060608801359150808211156101e857600080fd5b506101f58882890161008a565b96999598509396509294939250505056fea164736f6c6343000814000a";

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
