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
  Text,
  Icon
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

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
            <Text>{t("chooseLanguage")}</Text>
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
                <Text>{t(code)}</Text>
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
