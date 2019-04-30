import React from "react";
import { Container, Content } from "native-base";

import "moment/locale/he";
import { useTranslation } from "react-i18next";
import DarkHeader from "../components/DarkHeader";
import Purchases from "../components/Purchases";
import { OFFWHITE } from "../constants/Colors";

export default function PurchasesScreen() {
  const { t } = useTranslation("stores");
  return (
    <Container style={{ backgroundColor: OFFWHITE }}>
      <DarkHeader title={t("purchases:purchases")} />
      <Content>
        <Purchases />
      </Content>
    </Container>
  );
}
