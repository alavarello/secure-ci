import {ContractTransactionResponse, Provider, Signer} from "ethers";
import {SCIRegistry as Contract, SCIRegistry__factory as factory} from "./typechain-types";

export class SCIRegistry  {
    private _contract: Contract;

    private static _configs: {[key: number]: string} = {
        31337: "",
        1: ""
    }

    static async getContract(signerOrProvider: Signer | Provider): Promise<SCIRegistry> {
      let provider: Provider | undefined;
      if(signerOrProvider.provider) {
        provider = signerOrProvider.provider;
      } else {
        provider = signerOrProvider as Provider;
      }

      if(!provider) throw Error("Provider not found");

      const network = await provider.getNetwork();
      return new SCIRegistry(this._configs[Number(network.chainId)], signerOrProvider);
    }

    constructor(contractAddress: string, provider: Signer | Provider) {
      this._contract = factory.connect(contractAddress, provider);
    }

    public async addAddresses(domain: string, chainId: number, addresses: string[]): Promise<ContractTransactionResponse> {
        return this._contract.addAddresses(
            1,
            domain,
            chainId,
            addresses
        );
    }


}