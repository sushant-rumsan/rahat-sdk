import { SDKConfig } from "../interfaces";
import { EVM_TransactionModule } from "./modules/chain-specific/evm.transaction.module";
import { Stellar_TransactionModule } from "./modules/chain-specific/stellar.transaction.module";
import { WalletModule } from "./modules/wallet.module";

export class RahatWalletSDK {
  private static instance: RahatWalletSDK;
  private sdkConfig: SDKConfig;
  public wallet: WalletModule;
  public evm: EVM_TransactionModule;
  public stellar: Stellar_TransactionModule;

  constructor(config: SDKConfig) {
    this.sdkConfig = config;

    if (!RahatWalletSDK.instance) {
      RahatWalletSDK.instance = this;
    }

    this.wallet = new WalletModule(this);
    this.evm = new EVM_TransactionModule(this);
    this.stellar = new Stellar_TransactionModule(this);

    return RahatWalletSDK.instance;
  }

  public getConfig(): SDKConfig {
    return this.sdkConfig;
  }
}
