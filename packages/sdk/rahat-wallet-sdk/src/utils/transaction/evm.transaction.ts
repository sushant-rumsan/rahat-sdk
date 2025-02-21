import { ethers } from "ethers";
import {
  EVM_TransactionWithURL,
  EVM_TransactionToSendWithURL,
  EVM_TransactionToSignWithURL,
} from "../../types/chain-specific/evm.type";

export async function getEVMTransaction(
  transactionParams: EVM_TransactionWithURL
): Promise<any> {
  const provider = new ethers.JsonRpcProvider(
    transactionParams.networkProvider
  );

  const contract = new ethers.Contract(
    transactionParams.contractAddress,
    transactionParams.abi,
    provider
  );

  if (!contract[transactionParams.functionName]) {
    throw new Error(
      `Function ${transactionParams.functionName} not found in ABI.`
    );
  }

  let txn = await contract[transactionParams.functionName].populateTransaction(
    ...transactionParams.args
  );

  const [feeData, estimatedGas] = await Promise.all([
    provider.getFeeData(),
    provider.estimateGas(txn),
  ]);

  return {
    ...txn,
    chainId: BigInt(transactionParams.chainId),
    gasLimit:
      transactionParams?.options?.gasLimit ??
      BigInt(Number(estimatedGas) + 10000),
    maxFeePerGas:
      transactionParams?.options?.maxFeePerGas ?? feeData.maxFeePerGas,
    maxPriorityFeePerGas:
      transactionParams?.options?.maxPriorityFeePerGas ??
      feeData.maxPriorityFeePerGas,
  };
}

export async function signTransaction(
  transactionToSign: EVM_TransactionToSignWithURL
) {
  const { txn } = transactionToSign;
  const provider = new ethers.JsonRpcProvider(
    transactionToSign.networkProvider
  );
  const wallet = new ethers.Wallet(transactionToSign.privateKey, provider);
  const nonce = await wallet.getNonce();
  txn.nonce = nonce;
  return wallet.signTransaction(transactionToSign.txn);
}

export async function sendTransaction(
  sendTransaction: EVM_TransactionToSendWithURL
) {
  const provider = new ethers.JsonRpcProvider(sendTransaction.networkProvider);

  const hash = await provider.send("eth_sendRawTransaction", [
    sendTransaction.signedTxn,
  ]);

  await provider.waitForTransaction(hash);

  return hash;
}
