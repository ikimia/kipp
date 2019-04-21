import React, { useContext } from "react";
import {
  Text,
  Header,
  Body,
  Right,
  Container,
  Content,
  ListItem,
  List
} from "native-base";
import { NavigationContext } from "react-navigation";
import AlignedText from "./AlignedText";
import ArrowIcon from "./ArrowIcon";
import { useTranslation } from "react-i18next";

const ITEMS = [
  ["myAccount", "MyAccount"],
  ["paymentSettings", "PaymentSettings"],
  ["language", "LanguageSettings", (t, i18n) => t(i18n.language)]
];

export default function SideBar() {
  const navigation = useContext(NavigationContext);
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <Header transparent />
      <Content>
        <List>
          <ListItem first last onPress={() => navigation.navigate("Purchases")}>
            <Body>
              <Text>Purchases</Text>
            </Body>
            <Right>
              <ArrowIcon />
            </Right>
          </ListItem>
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
