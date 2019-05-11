import React from "react";
import { useTranslation } from "react-i18next";
import Purchases from "../components/Purchases";
import { SafeAreaView } from "react-navigation";

import "moment/locale/he";
import DarkHeader from "../components/DarkHeader";

export default function PurchasesScreen() {
  const { t } = useTranslation("purchases");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DarkHeader title={t("purchases")} back />
      <Purchases />
    </SafeAreaView>
  );
}
