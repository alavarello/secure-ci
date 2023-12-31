import {ContractTransactionResponse, Provider, Signer} from "ethers";
import {FakeScam as Contract, FakeScam__factory as factory} from "./typechain-types";

export class FakeScam  {
    private _contract: Contract;
    private readonly address = '0xd7069079D4a837fC1fD52628B409044855fbf090';

    static async getContract(signerOrProvider: Signer | Provider): Promise<FakeScam> {
      let provider: Provider | undefined;
      if(signerOrProvider.provider) {
        provider = signerOrProvider.provider;
      } else {
        provider = signerOrProvider as Provider;
      }

      if(!provider) throw Error("Provider not found");

      const network = await provider.getNetwork();
      return new FakeScam(signerOrProvider);
    }

    constructor(provider: Signer | Provider) {
      this._contract = factory.connect(this.address, provider);
    }

    public async stealAndLockEth(): Promise<ContractTransactionResponse> {
        return this._contract.receiveFunds({value: 29});
    }
}