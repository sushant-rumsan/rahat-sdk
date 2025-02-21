import CryptoJS from "crypto-js";

export function encrypt(mnemonic: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(mnemonic, secretKey).toString();
}

export function decrypt(encryptedMnemonic: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedMnemonic, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
