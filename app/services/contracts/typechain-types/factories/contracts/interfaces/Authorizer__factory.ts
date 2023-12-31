/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Authorizer,
  AuthorizerInterface,
} from "../../../contracts/interfaces/Authorizer";

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

export class Authorizer__factory {
  static readonly abi = _abi;
  static createInterface(): AuthorizerInterface {
    return new Interface(_abi) as AuthorizerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Authorizer {
    return new Contract(address, _abi, runner) as unknown as Authorizer;
  }
}
