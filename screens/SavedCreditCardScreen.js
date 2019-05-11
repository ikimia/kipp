import React, { useState, useContext, useEffect } from "react";
import {
  Left,
  Title,
  Body,
  Container,
  Right,
  Header,
  Content,
  Text,
  Form,
  Input,
  Item,
  Label,
  Button
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import { NavigationContext } from "react-navigation";
import { useTextAlign } from "../hooks/direction";
import { CreditCardStorage } from "../Storage";
import CreditCardIcon from "../components/CreditCardIcon";

const formatCardNumber = cardNumber =>
  cardNumber ? cardNumber.match(/.{1,4}/g).join(" ") : "";

const formatDate = date => (date ? date.match(/.{1,2}/g).join("/") : "");

export default function SavedCreditCardScreen() {
  const { t } = useTranslation("settings");
  const { goBack, getParam } = useContext(NavigationContext);
  const textAlign = useTextAlign();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  useEffect(() => {
    const navigationCardNumber = getParam("cardNumber", "");
    if (navigationCardNumber) {
      CreditCardStorage.get(navigationCardNumber).then(result => {
        if (result) {
          const [cardNumber, expirationDate, cvv] = result;
          setCardNumber(cardNumber);
          setExpirationDate(expirationDate);
          setCVV(cvv);
        }
      });
    }
  }, []);
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
              value={formatCardNumber(cardNumber)}
              style={{ textAlign }}
              disabled
            />
            <CreditCardIcon
              cardNumber={cardNumber}
              style={{ fontSize: 25, marginEnd: 10 }}
            />
          </Item>
          <Item inlineLabel>
            <Label>{t("expiry")}</Label>
            <Input
              value={formatDate(expirationDate)}
              style={{ textAlign }}
              disabled
            />
          </Item>
          <Item inlineLabel last>
            <Label>{t("securityCode")}</Label>
            <Input value={cvv} style={{ textAlign }} disabled />
          </Item>
        </Form>
        <Button
          full
          danger
          style={{ marginTop: 20 }}
          onPress={async () => {
            await CreditCardStorage.delete(cardNumber);
            goBack();
          }}
        >
          <Text>{t("removeCreditCard")}</Text>
        </Button>
      </Content>
    </Container>
  );
}
