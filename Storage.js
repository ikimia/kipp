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

const OfferStorageKey = "@Kipp_offer";
export class OfferStorage {
  static get() {
    return AsyncStorage.getItem(OfferStorageKey).then(JSON.parse);
  }
  static set(offer) {
    return AsyncStorage.setItem(OfferStorageKey, JSON.stringify(offer));
  }
  static delete() {
    return AsyncStorage.removeItem(OfferStorageKey);
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
