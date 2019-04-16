import React, { useContext } from "react";
import { Button, Icon, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { useDirection, LTR } from "../hooks/direction";
import { NavigationContext } from "react-navigation";

export default function BackButton() {
  const { goBack } = useContext(NavigationContext);
  const { t } = useTranslation("common");
  const direction = useDirection();
  const iconName = direction === LTR ? "arrow-back" : "arrow-forward";
  return (
    <Button transparent onPress={() => goBack()}>
      <Icon name={iconName} />
      <Text>{t("back")}</Text>
    </Button>
  );
}
