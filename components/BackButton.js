import React, { useContext } from "react";
import { Button, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import ArrowIcon from "./ArrowIcon";

export default function BackButton() {
  const { goBack } = useContext(NavigationContext);
  const { t } = useTranslation("common");
  return (
    <Button transparent onPress={() => goBack()}>
      <ArrowIcon back />
      <Text>{t("back")}</Text>
    </Button>
  );
}
