import {ContractTransactionResponse, Provider, Signer} from "ethers";
import {SCIRegistry as Contract, SCIRegistry__factory as factory} from "./typechain-types";

export class SCIRegistry  {
    private _contract: Contract;

    private static _configs: {[key: number]: string} = {
        5: "0xc17d3Bce3E18AF745a4392C52f637a1693a64eA0",
        11155111: "0x11B6CFb8e498Ac6FA6ADB7Ef2e6c528b13C42B87",
        31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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