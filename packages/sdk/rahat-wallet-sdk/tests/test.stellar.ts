import { Account, Networks } from "stellar-sdk";
import { RahatWalletSDK } from "../src/core";
import { Horizon } from "@stellar/stellar-sdk";

const testStellar = async () => {
  const networkProviderStellar = "https://soroban-testnet.stellar.org:443";
  const walletSdk = new RahatWalletSDK({
    encryptionKey: "my-secret-key",
    chains: {
      stellar: {
        networkProvider: networkProviderStellar,
      },
    },
  });

  const server = new Horizon.Server("https://horizon-testnet.stellar.org");
  const account = await server.loadAccount(
    "GCA3OBLTAEDY2GF3RPOJ7AZB72Z536KAQC55KEIRKUBPQ3MKIXNCEKGG"
  );

  console.log(
    await walletSdk.stellar.createTransaction({
      publicKey: account,
      networkPassphrase: Networks.TESTNET,
      contractAddress:
        "CACDYF3CYMJEJTIVFESQYZTN67GO2R5D5IUABTCUG3HXQSRXCSOROBAN",
      args: "sushant",
      functionName: "hello",
      fee: 1000,
    })
  );
};

testStellar();
