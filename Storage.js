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

const creditCardStorageKey = "@Kipp_CreditCards";
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

const facebookAccessTokenKey = "@Kipp_facebookAccessToken";
export class FacebookAccessTokenStorage {
  static set(accessToken) {
    return AsyncStorage.setItem(
      facebookAccessTokenKey,
      JSON.stringify(accessToken)
    );
  }
  static get() {
    return AsyncStorage.getItem(facebookAccessTokenKey).then(JSON.parse);
  }
  static delete() {
    return AsyncStorage.removeItem(facebookAccessTokenKey);
  }
}

const facebookProfileKey = "@Kipp_facebookProfile";
export class FacebookProfileStorage {
  static set(profile) {
    return AsyncStorage.setItem(facebookProfileKey, JSON.stringify(profile));
  }
  static get() {
    return AsyncStorage.getItem(facebookProfileKey).then(JSON.parse);
  }
  static delete() {
    return AsyncStorage.removeItem(facebookProfileKey);
  }
}
