import { SDKConfig } from "../../../interfaces";
import {
  getEVMTransaction,
  sendTransaction,
  signTransaction,
} from "../../../utils/transaction/evm.transaction";
import { RahatWalletSDK } from "../../config.service";
import {
  EVM_CreateTransactionWithPk,
  EVM_Transaction,
  EVM_TransactionToSend,
  EVM_TransactionToSign,
} from "../../../types/chain-specific/evm.type";
import { ContractTransaction } from "ethers";
import { getChainConfig } from "../../../utils/wallet";
import { ChainType } from "../../../types";

export class EVM_TransactionModule {
  private config: SDKConfig;
  private defaultChainID: number = 84532;
  private chain: ChainType = "evm";

  constructor(config: RahatWalletSDK) {
    this.config = config.getConfig();
  }

  async createTransaction(
    transactionParams: EVM_Transaction
  ): Promise<ContractTransaction> {
    const chainConfig = getChainConfig(this.config, this.chain);

    return getEVMTransaction({
      ...transactionParams,
      networkProvider: chainConfig.networkProvider,
      chainId: chainConfig.chainId || this.defaultChainID,
    });
  }

  async signTransaction(transactionToSign: EVM_TransactionToSign) {
    const chainConfig = getChainConfig(this.config, this.chain);
    return signTransaction({
      txn: transactionToSign.txn,
      networkProvider: chainConfig.networkProvider,
      privateKey: transactionToSign.privateKey,
    });
  }

  async sendTransaction(transactionToSend: EVM_TransactionToSend) {
    const chainConfig = getChainConfig(this.config, this.chain);
    return sendTransaction({
      ...transactionToSend,
      networkProvider: chainConfig.networkProvider,
    });
  }

  async writeContract(transactionParams: EVM_CreateTransactionWithPk) {
    const chainConfig = getChainConfig(this.config, this.chain);

    const txn = await getEVMTransaction({
      ...transactionParams.txnParams,
      networkProvider: chainConfig.networkProvider,
      chainId: chainConfig.chainId || this.defaultChainID,
    });

    const signedTxn = await signTransaction({
      txn,
      privateKey: transactionParams.privateKey,
      networkProvider: chainConfig.networkProvider,
    });

    return sendTransaction({
      signedTxn,
      networkProvider: chainConfig.networkProvider,
    });
  }
}
