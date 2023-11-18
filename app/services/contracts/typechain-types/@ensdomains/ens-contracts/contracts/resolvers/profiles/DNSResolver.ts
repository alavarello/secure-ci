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
} from "../../../../../common";

export interface DNSResolverInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "clearRecords"
      | "dnsRecord"
      | "hasDNSRecords"
      | "recordVersions"
      | "setDNSRecords"
      | "setZonehash"
      | "supportsInterface"
      | "zonehash"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DNSRecordChanged"
      | "DNSRecordDeleted"
      | "DNSZonehashChanged"
      | "VersionChanged"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "clearRecords",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "dnsRecord",
    values: [BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasDNSRecords",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "recordVersions",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDNSRecords",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setZonehash",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "zonehash", values: [BytesLike]): string;

  decodeFunctionResult(
    functionFragment: "clearRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "dnsRecord", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasDNSRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recordVersions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDNSRecords",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setZonehash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "zonehash", data: BytesLike): Result;
}

export namespace DNSRecordChangedEvent {
  export type InputTuple = [
    node: BytesLike,
    name: BytesLike,
    resource: BigNumberish,
    record: BytesLike
  ];
  export type OutputTuple = [
    node: string,
    name: string,
    resource: bigint,
    record: string
  ];
  export interface OutputObject {
    node: string;
    name: string;
    resource: bigint;
    record: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DNSRecordDeletedEvent {
  export type InputTuple = [
    node: BytesLike,
    name: BytesLike,
    resource: BigNumberish
  ];
  export type OutputTuple = [node: string, name: string, resource: bigint];
  export interface OutputObject {
    node: string;
    name: string;
    resource: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DNSZonehashChangedEvent {
  export type InputTuple = [
    node: BytesLike,
    lastzonehash: BytesLike,
    zonehash: BytesLike
  ];
  export type OutputTuple = [
    node: string,
    lastzonehash: string,
    zonehash: string
  ];
  export interface OutputObject {
    node: string;
    lastzonehash: string;
    zonehash: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VersionChangedEvent {
  export type InputTuple = [node: BytesLike, newVersion: BigNumberish];
  export type OutputTuple = [node: string, newVersion: bigint];
  export interface OutputObject {
    node: string;
    newVersion: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface DNSResolver extends BaseContract {
  connect(runner?: ContractRunner | null): DNSResolver;
  waitForDeployment(): Promise<this>;

  interface: DNSResolverInterface;

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

  clearRecords: TypedContractMethod<[node: BytesLike], [void], "nonpayable">;

  dnsRecord: TypedContractMethod<
    [node: BytesLike, name: BytesLike, resource: BigNumberish],
    [string],
    "view"
  >;

  hasDNSRecords: TypedContractMethod<
    [node: BytesLike, name: BytesLike],
    [boolean],
    "view"
  >;

  recordVersions: TypedContractMethod<[arg0: BytesLike], [bigint], "view">;

  setDNSRecords: TypedContractMethod<
    [node: BytesLike, data: BytesLike],
    [void],
    "nonpayable"
  >;

  setZonehash: TypedContractMethod<
    [node: BytesLike, hash: BytesLike],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceID: BytesLike],
    [boolean],
    "view"
  >;

  zonehash: TypedContractMethod<[node: BytesLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "clearRecords"
  ): TypedContractMethod<[node: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "dnsRecord"
  ): TypedContractMethod<
    [node: BytesLike, name: BytesLike, resource: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "hasDNSRecords"
  ): TypedContractMethod<[node: BytesLike, name: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "recordVersions"
  ): TypedContractMethod<[arg0: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "setDNSRecords"
  ): TypedContractMethod<
    [node: BytesLike, data: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setZonehash"
  ): TypedContractMethod<
    [node: BytesLike, hash: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceID: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "zonehash"
  ): TypedContractMethod<[node: BytesLike], [string], "view">;

  getEvent(
    key: "DNSRecordChanged"
  ): TypedContractEvent<
    DNSRecordChangedEvent.InputTuple,
    DNSRecordChangedEvent.OutputTuple,
    DNSRecordChangedEvent.OutputObject
  >;
  getEvent(
    key: "DNSRecordDeleted"
  ): TypedContractEvent<
    DNSRecordDeletedEvent.InputTuple,
    DNSRecordDeletedEvent.OutputTuple,
    DNSRecordDeletedEvent.OutputObject
  >;
  getEvent(
    key: "DNSZonehashChanged"
  ): TypedContractEvent<
    DNSZonehashChangedEvent.InputTuple,
    DNSZonehashChangedEvent.OutputTuple,
    DNSZonehashChangedEvent.OutputObject
  >;
  getEvent(
    key: "VersionChanged"
  ): TypedContractEvent<
    VersionChangedEvent.InputTuple,
    VersionChangedEvent.OutputTuple,
    VersionChangedEvent.OutputObject
  >;

  filters: {
    "DNSRecordChanged(bytes32,bytes,uint16,bytes)": TypedContractEvent<
      DNSRecordChangedEvent.InputTuple,
      DNSRecordChangedEvent.OutputTuple,
      DNSRecordChangedEvent.OutputObject
    >;
    DNSRecordChanged: TypedContractEvent<
      DNSRecordChangedEvent.InputTuple,
      DNSRecordChangedEvent.OutputTuple,
      DNSRecordChangedEvent.OutputObject
    >;

    "DNSRecordDeleted(bytes32,bytes,uint16)": TypedContractEvent<
      DNSRecordDeletedEvent.InputTuple,
      DNSRecordDeletedEvent.OutputTuple,
      DNSRecordDeletedEvent.OutputObject
    >;
    DNSRecordDeleted: TypedContractEvent<
      DNSRecordDeletedEvent.InputTuple,
      DNSRecordDeletedEvent.OutputTuple,
      DNSRecordDeletedEvent.OutputObject
    >;

    "DNSZonehashChanged(bytes32,bytes,bytes)": TypedContractEvent<
      DNSZonehashChangedEvent.InputTuple,
      DNSZonehashChangedEvent.OutputTuple,
      DNSZonehashChangedEvent.OutputObject
    >;
    DNSZonehashChanged: TypedContractEvent<
      DNSZonehashChangedEvent.InputTuple,
      DNSZonehashChangedEvent.OutputTuple,
      DNSZonehashChangedEvent.OutputObject
    >;

    "VersionChanged(bytes32,uint64)": TypedContractEvent<
      VersionChangedEvent.InputTuple,
      VersionChangedEvent.OutputTuple,
      VersionChangedEvent.OutputObject
    >;
    VersionChanged: TypedContractEvent<
      VersionChangedEvent.InputTuple,
      VersionChangedEvent.OutputTuple,
      VersionChangedEvent.OutputObject
    >;
  };
}