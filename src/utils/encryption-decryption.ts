import * as CryptoJS from 'crypto-js';

function cryptoSignature() {
  return process.env.CRYPTO_SIGNATURE;
}

export function encrypt(data: any) {
  if (!data) {
    return data;
  }

  const signature = cryptoSignature(),
    stringifyData = JSON.stringify(data);

  return CryptoJS.AES.encrypt(stringifyData, signature).toString();
}

export function decrypt(encryptData: any) {
  if (!encryptData) {
    return encryptData;
  }

  const signature = cryptoSignature(),
    bytes = CryptoJS.AES.decrypt(encryptData, signature);

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
