import { ChainType } from "../types";

export interface SDKConfig {
  encryptionKey: string;
  chains: Partial<Record<ChainType, ChainConfig>>;
}

export interface ChainConfig {
  networkProvider: string;
  chainId?: number;
}
