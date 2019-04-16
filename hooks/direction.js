import { useTranslation } from "react-i18next";

export const RTL = "rtl";
export const LTR = "ltr";

export function useDirection() {
  const { i18n } = useTranslation();
  return i18n.language.startsWith("he") ? RTL : LTR;
}
