import { Account } from "stellar-sdk";

export type Stellar_Transaction = {
  publicKey: Account;
  networkPassphrase: string;
  contractAddress: string;
  args: any;
  functionName: string;
  fee: number;
};
