import React from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem,
  Text
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import ArrowIcon from "../components/ArrowIcon";
import AlignedText from "../components/AlignedText";

export default function PaymentSettingsScreen({ navigation }) {
  const { t } = useTranslation("settings");
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>{t("paymentSettings")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <List>
          <ListItem itemDivider />
          <ListItem itemDivider>
            <Text>{t("addPaymentMethods")}</Text>
          </ListItem>
          <ListItem
            noIndent
            icon
            style={{ backgroundColor: "white" }}
            last
            onPress={() => navigation.navigate("NewCreditCard")}
          >
            <Body>
              <AlignedText>{t("creditCard")}</AlignedText>
            </Body>
            <Right>
              <ArrowIcon />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
