import { encrypt } from "../../utils/crypto";
import {
  generateMnemonic,
  getAddressFromPrivateKey,
  getPrivateKeyUsingMnemonics,
  getWalletUsingMnemonic,
} from "../../utils/wallet";
import { ChainType } from "../../types";
import { RahatWalletSDK } from "../config.service";
import { SDKConfig } from "../../interfaces";

export class WalletModule {
  private config: SDKConfig;

  constructor(config: RahatWalletSDK) {
    this.config = config.getConfig();
  }

  createWallet(): string {
    return encrypt(generateMnemonic(), this.config.encryptionKey);
  }

  getAddressFromMnemonic(encryptedMnemonic: string, chain: ChainType): string {
    return getWalletUsingMnemonic(
      encryptedMnemonic,
      chain,
      this.config.encryptionKey
    );
  }

  getPrivateFromMnemonic(encryptedMnemonic: string, chain: ChainType): string {
    return getPrivateKeyUsingMnemonics(
      encryptedMnemonic,
      chain,
      this.config.encryptionKey
    );
  }

  getAddressFromPrivateKey(privateKey: string, chain: ChainType): string {
    return getAddressFromPrivateKey(privateKey, chain);
  }

  async getBalance(address: string, chain: ChainType) {}
}
