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

export class CreditCardStorage {
  static set(cardNumber, expirationDate, cvv) {
    return AsyncStorage.mergeItem(
      "@StreetPay_CreditCards",
      JSON.stringify({ [cardNumber]: [cardNumber, expirationDate, cvv] })
    );
  }
  static getAll() {
    return AsyncStorage.getItem("@StreetPay_CreditCards")
      .then(value => JSON.parse(value) || {})
      .then(Object.values)
      .then(creditCards => creditCards.filter(v => v));
  }
  static get(cardNumber) {
    return AsyncStorage.getItem("@StreetPay_CreditCards")
      .then(JSON.parse)
      .then(allCreditCards => {
        return allCreditCards[cardNumber] || null;
      });
  }
  static delete(cardNumber) {
    return AsyncStorage.mergeItem(
      "@StreetPay_CreditCards",
      JSON.stringify({ [cardNumber]: null })
    );
  }
}
