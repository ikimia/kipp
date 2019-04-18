import React, { useState, useContext } from "react";
import {
  Left,
  Title,
  Body,
  Container,
  Right,
  Header,
  Content,
  Text,
  Icon,
  Form,
  Input,
  Item,
  Label,
  Button
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { NavigationContext } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { getCreditCardIcon } from "./CreditCardFunctions";
import { useTextAlign } from "../hooks/direction";

const formatCardNumber = cardNumber =>
  cardNumber ? cardNumber.match(/.{1,4}/g).join(" ") : "";

const formatDate = date => (date ? date.match(/.{1,2}/g).join("/") : "");

function isCreditCardValid(cardNumber, date, cvv) {
  return (
    cardNumber.length === 16 &&
    date.length === 4 &&
    +date.slice(0, 2) >= 1 &&
    +date.slice(0, 2) <= 12 &&
    cvv.length === 3
  );
}

export default function NewCreditCardScreen() {
  const { t } = useTranslation("settings");
  const textAlign = useTextAlign();
  const { goBack } = useContext(NavigationContext);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>{t("creditCardTitle")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <Form>
          <Item inlineLabel>
            <Label>{t("cardNumber")}</Label>
            <Input
              keyboardType="decimal-pad"
              value={formatCardNumber(cardNumber)}
              onChangeText={newText => {
                setCardNumber(newText.replace(/ /g, ""));
              }}
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              style={{ textAlign }}
            />
            <Icon type="FontAwesome" name={getCreditCardIcon(cardNumber)} />
          </Item>
          <Item inlineLabel>
            <Label>{t("expiry")}</Label>
            <Input
              keyboardType="decimal-pad"
              placeholder="MM/YY"
              maxLength={5}
              value={formatDate(expirationDate)}
              onChangeText={newText => {
                setExpirationDate(newText.replace(/\//g, ""));
              }}
              style={{ textAlign }}
            />
          </Item>
          <Item inlineLabel last>
            <Label>{t("securityCode")}</Label>
            <Input
              keyboardType="decimal-pad"
              placeholder="•••"
              maxLength={3}
              value={cvv}
              onChangeText={setCVV}
              style={{ textAlign }}
            />
          </Item>
        </Form>
        <Button
          full
          disabled={!isCreditCardValid(cardNumber, expirationDate, cvv)}
          style={{ marginTop: 20 }}
          onPress={async () => {
            await await AsyncStorage.mergeItem(
              "@StreetPay_CreditCards",
              JSON.stringify({
                [cardNumber]: [cardNumber, expirationDate, cvv]
              })
            );
            goBack();
          }}
        >
          <Text>{t("saveCreditCard")}</Text>
        </Button>
      </Content>
    </Container>
  );
}
