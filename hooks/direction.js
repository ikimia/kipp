import { useTranslation } from "react-i18next";
import i18next from "i18next";

const isLanguageRTL = language => language.startsWith("he");

export const RTL = "rtl";
export const LTR = "ltr";

export function useDirection() {
  const { i18n } = useTranslation();
  return isLanguageRTL(i18n.language) ? RTL : LTR;
}

export function useTextAlign() {
  const { i18n } = useTranslation();
  return isLanguageRTL(i18n.language) ? "right" : "left";
}

export const isRTL = () => isLanguageRTL(i18next.language);
