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
  Icon
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import AlignedText from "../components/AlignedText";
import AsyncStorage from "@react-native-community/async-storage";

const ITEMS = ["en", "he"];

export default function LanguageSettingsScreen() {
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>{t("language")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem itemDivider>
            <AlignedText>{t("chooseLanguage")}</AlignedText>
          </ListItem>
          {ITEMS.map((code, i) => (
            <ListItem
              key={code}
              noIndent
              icon
              first={i === 0}
              last={i === ITEMS.length - 1}
              onPress={() => {
                i18n.changeLanguage(code);
                AsyncStorage.setItem("@StreetPay_language", code);
              }}
            >
              <Body>
                <AlignedText>{t(code)}</AlignedText>
              </Body>
              {code === i18n.language ? (
                <Right>
                  <Icon name="checkmark" />
                </Right>
              ) : null}
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
