import AsyncStorage from "@react-native-community/async-storage";

const languageStorageKey = "@Kipp_language";
export class LanguageStorage {
  static get() {
    return AsyncStorage.getItem(languageStorageKey);
  }
  static set(code) {
    return AsyncStorage.setItem(languageStorageKey, code);
  }
}

const creditCardStorageKey = "@Kipp_CreditCard";
export class CreditCardStorage {
  static set(cardNumber, expirationDate, cvv) {
    return AsyncStorage.setItem(
      creditCardStorageKey,
      JSON.stringify({ cardNumber, expirationDate, cvv })
    );
  }
  static get() {
    return AsyncStorage.getItem(creditCardStorageKey).then(JSON.parse);
  }
  static delete() {
    return AsyncStorage.removeItem(creditCardStorageKey);
  }
}
