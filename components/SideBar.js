import React, { useContext } from "react";
import {
  Text,
  Header,
  Body,
  Right,
  Container,
  Content,
  ListItem,
  List,
  Icon,
  Left,
  Button
} from "native-base";
import { NavigationContext } from "react-navigation";
import AlignedText from "./AlignedText";
import ArrowIcon from "./ArrowIcon";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line jsdoc/require-param
/**
 * @typedef {(t: (language: string)=>string, i18n: object)=>string} rightCallback
 * @type {[string, string, rightCallback][]}
 */
const ITEMS = [
  ["myAccount", "MyAccount", null],
  ["paymentSettings", "PaymentSettings", null],
  ["language", "LanguageSettings", (t, i18n) => t(i18n.language)]
];

/** @param {{closeDrawer: () => void}} props */
export default function SideBar({ closeDrawer }) {
  const navigation = useContext(NavigationContext);
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <Header transparent>
        <Left>
          <Button transparent onPress={closeDrawer}>
            <Icon name="close" style={{ color: "black" }} />
          </Button>
        </Left>
      </Header>
      <Content>
        <List>
          <ListItem itemHeader>
            <Text>Settings</Text>
          </ListItem>
          {ITEMS.map(([item, screen, right], i) => (
            <ListItem
              key={item}
              icon
              first={i === 0}
              last={i === ITEMS.length - 1}
              onPress={() => navigation.navigate(screen)}
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
