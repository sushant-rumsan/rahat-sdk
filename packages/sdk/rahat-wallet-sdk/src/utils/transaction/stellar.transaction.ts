import { Contract, TransactionBuilder, xdr } from "stellar-sdk";
import { Stellar_Transaction } from "../../types/chain-specific/stellar.type";

export async function getStellarTransaction(
  transactionParams: Stellar_Transaction
) {
  console.log(transactionParams.contractAddress);
  const contract = new Contract(transactionParams.contractAddress);

  return new TransactionBuilder(transactionParams.publicKey, {
    fee: transactionParams.fee.toString(),
    networkPassphrase: transactionParams.networkPassphrase,
  })
    .addOperation(
      contract.call(
        transactionParams.functionName,
        xdr.ScVal.scvString(transactionParams.args)
      )
    )
    .setTimeout(30)
    .build();
}
