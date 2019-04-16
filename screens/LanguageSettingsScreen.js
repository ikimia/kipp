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
        <List>
          <ListItem itemDivider>
            <AlignedText>{t("chooseLanguage")}</AlignedText>
          </ListItem>
          {ITEMS.map((code, i) => (
            <ListItem
              key={code}
              noIndent
              icon
              style={{ backgroundColor: "white" }}
              first={i === 0}
              last={i === ITEMS.length - 1}
              onPress={() => {
                i18n.changeLanguage(code);
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
