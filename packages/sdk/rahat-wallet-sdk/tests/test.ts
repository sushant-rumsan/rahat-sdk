import { ContractTransaction } from "ethers";
import { RahatWalletSDK } from "../";
import { tokenAbi } from "./abi";

const getWallet = async () => {
  const chain = "evm";
  const networkProvider =
    "https://base-sepolia.g.alchemy.com/v2/T0PE-HxhWOEH0eUNTcUOFgPQJiQzL6uf";

  const contractAddress = "0x33b0AA3D65Fda9cB3C80D45fB5b42159623a2759";
  const privateKey =
    "0x404b135088bc4046f8ae06c939e3aa2c3ea0fdc0d8c9109926fa5cb7184ec08f";

  const walletSdk = new RahatWalletSDK({
    encryptionKey: "my-secret-key",
    chains: {
      evm: {
        networkProvider,
        chainId: 84532,
      },
    },
  });

  const encryptedMnemonics = walletSdk.wallet.createWallet();
  console.log("Encrypted Mnemonics:", encryptedMnemonics);

  const walletAddress = walletSdk.wallet.getAddressFromMnemonic(
    encryptedMnemonics,
    chain
  );
  const walletPrivateKey = walletSdk.wallet.getPrivateFromMnemonic(
    encryptedMnemonics,
    chain
  );
  console.log(chain, ": Wallet Address: ", walletAddress);
  console.log(chain, ": Wallet Private Key: ", walletPrivateKey);

  const walletAddressFromPrivateKey = walletSdk.wallet.getAddressFromPrivateKey(
    walletPrivateKey,
    chain
  );

  console.log(walletAddressFromPrivateKey);

  const txn: ContractTransaction = await walletSdk.evm.createTransaction({
    abi: tokenAbi,
    contractAddress,
    functionName: "distributeTokens",
    args: ["0xf0c84735Af5669c809EfD62C9D4e466d331A95b0", BigInt(1)],
  });

  console.log("Unsigned tranßsaction:", txn);

  const signedTransation = await walletSdk.evm.signTransaction({
    txn,
    privateKey,
  });

  console.log("Signed Transaction:", signedTransation);

  console.log(
    "Transaction Hash",
    await walletSdk.evm.sendTransaction({
      signedTxn: signedTransation,
    })
  );

  console.log(
    "Transaction from writeContract",
    await walletSdk.evm.writeContract({
      txnParams: {
        abi: tokenAbi,
        contractAddress,
        functionName: "distributeTokens",
        args: ["0xf0c84735Af5669c809EfD62C9D4e466d331A95b0", BigInt(1)],
      },
      privateKey,
    })
  );
};

getWallet();
