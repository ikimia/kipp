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
        makePayment: "Make Payment",
        authorizing: "Authorizing",
        capturing: "Capturing",
        sendingTransaction: "Sending Transaction"
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
        total: "Total",
        back: "Back",
        currencySign: "$",
        confirm: "Confirm",
        done: "Done"
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
      },
      stores: {
        foodStore: "McDonald's",
        foodStoreLocation: "Times Square",
        apparelStore: "Zara",
        apparelStoreLocation: "100m from Home",
        gasStation: "Amoco",
        gasStationLocation: "Valley Stream, NY",
        ShoesStore: "Clarks",
        ShoesStoreLocation: "521 W 25th St, NY",
        product1: "Cheese Burger",
        product2: "Chicken Nuggets",
        product3: "French Fries",
        product4: "French Pizza",
        product5: "Shamrock Fries",
        product6: "French Burger",
        product7: "Shamrock Shake"
      }
    },
    he: {
      pay: {
        pay: "תשלום",
        proceed: "המשך",
        receiptNumber: "מספר חשבונית",
        makePaymentFor: "תשלום עבור",
        makePayment: "בצע תשלום",
        authorizing: "מבקש הרשאה",
        capturing: "מחייב",
        sendingTransaction: "שולח עסקה"
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
        total: "סכום",
        back: "חזור",
        currencySign: "₪",
        confirm: "אישור",
        done: "בוצע"
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
      },
      stores: {
        foodStore: "מקדונלדס",
        foodStoreLocation: "שרונה, תל אביב",
        apparelStore: "זארה",
        apparelStoreLocation: "בקרבת הבית",
        gasStation: "פז",
        gasStationLocation: "חנקין 27, חולון",
        ShoesStore: "אדידס",
        ShoesStoreLocation: "הרצל 82, תל אביב",
        product1: "המבורגר גדול",
        product2: "קוקה קולה",
        product3: "מיץ תפוזים",
        product4: "מגש משפחתי",
        product5: "פוטטוס ענק",
        product6: "עוד מוצרים",
        product7: "ואפילו יותר מוצרים"
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
