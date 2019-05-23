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
