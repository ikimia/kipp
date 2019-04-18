import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "react-native-localize";

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: "en",
  resources: {
    en: {
      pay: {
        pay: "Pay",
        proceed: "Proceed",
        receiptNumber: "Receipt Number",
        makePaymentFor: "Make payment for",
        makePayment: "Make Payment"
      },
      common: {
        cancel: "Cancel",
        split: "Split",
        addTip: "Add tip",
        description: "Description",
        count: "Count",
        price: "Price",
        amount: "Amount",
        taxes: "Taxes",
        back: "Back"
      },
      purchases: {
        purchases: "Purchases"
      },
      settings: {
        settings: "Settings",
        myAccount: "My Account",
        paymentSettings: "Payments",
        savedPaymentMethods: "Saved Payment Methods",
        addPaymentMethods: "Add Payment Methods",
        creditCardTitle: "Credit Card",
        newCreditCard: "New Credit Card",
        newCreditCardAction: "New credit card",
        saveCreditCard: "Save credit card",
        removeCreditCard: "Remove credit card",
        cardNumber: " Card number",
        expiry: "Expiry",
        securityCode: "Securiry code",
        language: "Language",
        chooseLanguage: "Choose Language",
        en: "English",
        he: "Hebrew"
      },
      socialNetworks: {
        logout: "Logout",
        socialProfile: "Social Profile"
      }
    },
    he: {
      pay: {
        pay: "תשלום",
        proceed: "המשך",
        receiptNumber: "מספר חשבונית",
        makePaymentFor: "תשלום עבור",
        makePayment: "בצע תשלום"
      },
      common: {
        cancel: "ביטול",
        split: "פיצול",
        addTip: "הוסף טיפ",
        description: "תיאור",
        count: "כמות",
        price: "מחיר",
        amount: 'סה"כ',
        taxes: "מסים",
        back: "חזור"
      },
      purchases: {
        purchases: "רכישות"
      },
      settings: {
        settings: "הגדרות",
        myAccount: "החשבון שלי",
        paymentSettings: "אמצעי תשלום",
        savedPaymentMethods: "אמצעי תשלום שמורים",
        addPaymentMethods: "הוסף אמצעי תשלום",
        creditCardTitle: "כרטיס אשראי",
        newCreditCard: "כרטיס אשראי חדש",
        saveCreditCard: "שמור כרטיס אשראי",
        removeCreditCard: "הסר כרטיס אשראי",
        cardNumber: "מספר כרטיס",
        expiry: "תאריך תפוגה",
        securityCode: "CVC/CVV",
        newCreditCardAction: "כרטיס אשראי חדש",
        language: "שפה",
        chooseLanguage: "בחר שפה",
        en: "אנגלית",
        he: "עברית"
      },
      socialNetworks: {
        logout: "התנתק",
        socialProfile: "פרופיל"
      }
    }
  },

  ns: ["common"],
  defaultNS: "common",
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
