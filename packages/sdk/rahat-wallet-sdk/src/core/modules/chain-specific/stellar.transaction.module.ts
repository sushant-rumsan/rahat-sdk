import { SDKConfig } from "../../../interfaces";
import { ChainType } from "../../../types";
import { Stellar_Transaction } from "../../../types/chain-specific/stellar.type";
import { getStellarTransaction } from "../../../utils/transaction/stellar.transaction";
import { getChainConfig } from "../../../utils/wallet";
import { RahatWalletSDK } from "../../config.service";

export class Stellar_TransactionModule {
  private config: SDKConfig;
  private chain: ChainType = "stellar";

  constructor(config: RahatWalletSDK) {
    this.config = config.getConfig();
  }

  async createTransaction(transactionParams: Stellar_Transaction) {
    return getStellarTransaction(transactionParams);
  }
}
