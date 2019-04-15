import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import { getLocales } from "react-native-localize";

const languageDetector = {
  type: "languageDetector",
  async: false,
  init: () => {},
  detect: () => getLocales()[0].languageCode,
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
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
          paymentSettings: "Payment Settings",
          language: "Language",
          chooseLanguage: "Choose Language",
          en: "English",
          he: "Hebrew"
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
          paymentSettings: "הגדרות תשלום",
          language: "שפה",
          chooseLanguage: "בחר שפה",
          en: "אנגלית",
          he: "עברית"
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
