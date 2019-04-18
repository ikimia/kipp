import React from "react";
import {
  Container,
  Header,
  Left,
  Title,
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

const ITEMS = [
  ["myAccount"],
  ["paymentSettings"],
  ["language", (t, i18n) => t(i18n.language), "LanguageSettings"],
  ["socialNetworks:socialProfile", null, "SocialProfile"]
];

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>{t("settings")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <List>
          <ListItem itemDivider />
          {ITEMS.map(([item, right, screen], i) => (
            <ListItem
              key={item}
              noIndent
              icon
              style={{ backgroundColor: "white" }}
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
