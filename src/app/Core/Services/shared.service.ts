import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


   secretKey = 'FHGDGTTDGDKKJJD8558DKJDJFHGDGHSJDHHDJDJJ'; // use a strong secret key

 encryptData(data: any): string {
  const stringData = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(stringData, this.secretKey).toString();
  const urlSafe = encodeURIComponent(encrypted); // make it URL safe
  return urlSafe;
}

decryptData(encryptedText: string): any {
  const decoded = decodeURIComponent(encryptedText);
  const bytes = CryptoJS.AES.decrypt(decoded, this.secretKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
}

}
