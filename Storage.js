import AsyncStorage from "@react-native-community/async-storage";

const languageStorageKey = "@StreetPay_language";
export class LanguageStorage {
  static get() {
    return AsyncStorage.getItem(languageStorageKey);
  }
  static set(code) {
    return AsyncStorage.setItem(languageStorageKey, code);
  }
}

const creditCardStorageKey = "@StreetPay_CreditCards";
export class CreditCardStorage {
  static set(cardNumber, expirationDate, cvv) {
    return AsyncStorage.mergeItem(
      creditCardStorageKey,
      JSON.stringify({ [cardNumber]: [cardNumber, expirationDate, cvv] })
    );
  }
  static getAll() {
    return AsyncStorage.getItem(creditCardStorageKey)
      .then(value => JSON.parse(value) || {})
      .then(Object.values)
      .then(creditCards => creditCards.filter(v => v));
  }
  static get(cardNumber) {
    return AsyncStorage.getItem(creditCardStorageKey)
      .then(JSON.parse)
      .then(allCreditCards => {
        return allCreditCards[cardNumber] || null;
      });
  }
  static delete(cardNumber) {
    return AsyncStorage.mergeItem(
      creditCardStorageKey,
      JSON.stringify({ [cardNumber]: null })
    );
  }
}
