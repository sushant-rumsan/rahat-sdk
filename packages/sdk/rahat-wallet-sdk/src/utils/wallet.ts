import { HDNodeWallet, Mnemonic, Wallet } from "ethers";
import { ChainType } from "../types";
import { PATH } from "../constants";
import { Keypair } from "stellar-sdk";
import { Buffer } from "buffer";
import { decrypt } from "./crypto";
import { SDKConfig } from "../interfaces";

export function generateMnemonic(): string {
  return Wallet?.createRandom()?.mnemonic?.phrase || "";
}

export function getWalletUsingMnemonic(
  encryptedMnemonic: string,
  chain: ChainType,
  encryptionKey: string
): string {
  const mnemonic = decrypt(encryptedMnemonic, encryptionKey);
  const mnemonicWallet = Mnemonic.fromPhrase(mnemonic);
  const path = getPathWithChainName(chain);
  let wall = HDNodeWallet.fromMnemonic(mnemonicWallet, path);

  let address: string = "";

  switch (chain) {
    // Generate Stellar Keypair
    case "stellar":
      address = getStellarAccountFromMnemonics(wall).publicKey();
      break;
    default:
      address = wall.address;
  }

  return address;
}

export function getPrivateKeyUsingMnemonics(
  encryptedMnemonic: string,
  chain: ChainType,
  encryptionKey: string
): string {
  const mnemonic = decrypt(encryptedMnemonic, encryptionKey);
  const mnemonicWallet = Mnemonic.fromPhrase(mnemonic);
  const path = getPathWithChainName(chain);
  let wall = HDNodeWallet.fromMnemonic(mnemonicWallet, path);

  let secretKey: string = "";

  switch (chain) {
    // Generate Stellar Keypair
    case "stellar":
      secretKey = getStellarAccountFromMnemonics(wall).secret();
      break;
    default:
      secretKey = wall.privateKey;
  }

  return secretKey;
}

export function getAddressFromPrivateKey(
  privateKey: string,
  chain: ChainType
): string {
  console.log(privateKey);
  let address: string = "";
  switch (chain) {
    case "stellar":
      address = Keypair.fromSecret(privateKey).publicKey();
      break;
    default:
      address = new Wallet(privateKey).address;
  }

  return address;
}

export function getChainConfig(config: SDKConfig, chain: ChainType) {
  const chainConfig = config.chains[chain];

  if (!chainConfig) {
    throw new Error(`Chain configuration for ${chain} is missing.`);
  }

  return chainConfig;
}

// Utility
function getPathWithChainName(networkName: ChainType): string {
  return PATH[networkName];
}

function getStellarAccountFromMnemonics(wallet: any) {
  const privateKeyHex = wallet.privateKey.slice(2);
  const privateKeyBuffer = Buffer.from(privateKeyHex, "hex");
  const stellarKeypair = Keypair.fromRawEd25519Seed(privateKeyBuffer);

  return stellarKeypair;
}
