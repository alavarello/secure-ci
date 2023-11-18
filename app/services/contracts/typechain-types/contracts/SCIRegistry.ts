/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface SCIRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addAddresses"
      | "addAuthorizer"
      | "authorizers"
      | "hasBeenWhitelisted"
      | "hasContract"
      | "hasContractBeenWhitelisted"
      | "hasDomainBeenWhitelisted"
      | "isDomainWhitelisted"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
      | "whitelist"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AddressesAddedToDomain" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addAddresses",
    values: [BigNumberish, string, BigNumberish, AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addAuthorizer",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasBeenWhitelisted",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasContract",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasContractBeenWhitelisted",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasDomainBeenWhitelisted",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isDomainWhitelisted",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "whitelist",
    values: [string, BigNumberish, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAuthorizer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasBeenWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasContractBeenWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasDomainBeenWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isDomainWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "whitelist", data: BytesLike): Result;
}

export namespace AddressesAddedToDomainEvent {
  export type InputTuple = [
    authorizer: BigNumberish,
    domainOwner: AddressLike,
    domain: string,
    chainId: BigNumberish,
    contractAddresses: AddressLike[]
  ];
  export type OutputTuple = [
    authorizer: bigint,
    domainOwner: string,
    domain: string,
    chainId: bigint,
    contractAddresses: string[]
  ];
  export interface OutputObject {
    authorizer: bigint;
    domainOwner: string;
    domain: string;
    chainId: bigint;
    contractAddresses: string[];
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface SCIRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): SCIRegistry;
  waitForDeployment(): Promise<this>;

  interface: SCIRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addAddresses: TypedContractMethod<
    [
      authorizer: BigNumberish,
      domain: string,
      chainId: BigNumberish,
      addresses: AddressLike[]
    ],
    [void],
    "nonpayable"
  >;

  addAuthorizer: TypedContractMethod<
    [authorizerId: BigNumberish, authorizer: AddressLike],
    [void],
    "nonpayable"
  >;

  authorizers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  hasBeenWhitelisted: TypedContractMethod<[arg0: string], [boolean], "view">;

  hasContract: TypedContractMethod<
    [chainId: BigNumberish, contractAddress: AddressLike],
    [boolean],
    "nonpayable"
  >;

  hasContractBeenWhitelisted: TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;

  hasDomainBeenWhitelisted: TypedContractMethod<
    [arg0: string],
    [boolean],
    "view"
  >;

  isDomainWhitelisted: TypedContractMethod<
    [domainName: string],
    [boolean],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  whitelist: TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: AddressLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addAddresses"
  ): TypedContractMethod<
    [
      authorizer: BigNumberish,
      domain: string,
      chainId: BigNumberish,
      addresses: AddressLike[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addAuthorizer"
  ): TypedContractMethod<
    [authorizerId: BigNumberish, authorizer: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "authorizers"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "hasBeenWhitelisted"
  ): TypedContractMethod<[arg0: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "hasContract"
  ): TypedContractMethod<
    [chainId: BigNumberish, contractAddress: AddressLike],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasContractBeenWhitelisted"
  ): TypedContractMethod<
    [arg0: BigNumberish, arg1: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "hasDomainBeenWhitelisted"
  ): TypedContractMethod<[arg0: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "isDomainWhitelisted"
  ): TypedContractMethod<[domainName: string], [boolean], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "whitelist"
  ): TypedContractMethod<
    [arg0: string, arg1: BigNumberish, arg2: AddressLike],
    [boolean],
    "view"
  >;

  getEvent(
    key: "AddressesAddedToDomain"
  ): TypedContractEvent<
    AddressesAddedToDomainEvent.InputTuple,
    AddressesAddedToDomainEvent.OutputTuple,
    AddressesAddedToDomainEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "AddressesAddedToDomain(uint256,address,string,uint256,address[])": TypedContractEvent<
      AddressesAddedToDomainEvent.InputTuple,
      AddressesAddedToDomainEvent.OutputTuple,
      AddressesAddedToDomainEvent.OutputObject
    >;
    AddressesAddedToDomain: TypedContractEvent<
      AddressesAddedToDomainEvent.InputTuple,
      AddressesAddedToDomainEvent.OutputTuple,
      AddressesAddedToDomainEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
