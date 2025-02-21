import { EVM_Transaction } from "./chain-specific/evm.type";
import { Stellar_Transaction } from "./chain-specific/stellar.type";
import { ChainType } from "./chain.type";

export type CreateTransaction = {
  txnParams: EVM_Transaction | Stellar_Transaction;
  chain: ChainType;
};
