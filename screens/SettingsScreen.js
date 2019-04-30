import React, { useContext } from "react";
import {
  Container,
  Right,
  Body,
  Content,
  List,
  ListItem,
  Text
} from "native-base";
import { useTranslation } from "react-i18next";
import AlignedText from "../components/AlignedText";
import ArrowIcon from "../components/ArrowIcon";
import { NavigationContext } from "react-navigation";
import DarkHeader from "../components/DarkHeader";

const ITEMS = [
  ["myAccount", null, "MyAccount"],
  ["paymentSettings", null, "PaymentSettings"],
  ["language", (t, i18n) => t(i18n.language), "LanguageSettings"]
];

export default function SettingsScreen() {
  const navigation = useContext(NavigationContext);
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <DarkHeader title={t("settings")} />
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem itemDivider />
          {ITEMS.map(([item, right, screen], i) => (
            <ListItem
              key={item}
              noIndent
              icon
              first={i === 0}
              last={i === ITEMS.length - 1}
              onPress={screen && (() => navigation.navigate(screen))}
            >
              <Body>
                <AlignedText>{t(item)}</AlignedText>
              </Body>
              <Right>
                {right && <Text>{right(t, i18n)}</Text>}
                <ArrowIcon />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
