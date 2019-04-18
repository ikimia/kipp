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

export default function SavedCreditCardScreen() {
  const { t } = useTranslation("settings");
  const { goBack, getParam } = useContext(NavigationContext);
  const textAlign = useTextAlign();
  const [allCreditCards, setAllCreditCards] = useState({});
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("@StreetPay_CreditCards")
      .then(JSON.parse)
      .then(allCreditCards => {
        setAllCreditCards(allCreditCards);
        const navigationCardNumber = getParam("cardNumber", "");
        if (
          navigationCardNumber &&
          Object.prototype.hasOwnProperty.call(
            allCreditCards,
            navigationCardNumber
          )
        ) {
          const [cardNumber, expirationDate, cvv] = allCreditCards[
            navigationCardNumber
          ];
          setCardNumber(cardNumber);
          setExpirationDate(expirationDate);
          setCVV(cvv);
        }
      });
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
            <Icon type="FontAwesome" name={getCreditCardIcon(cardNumber)} />
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
            delete allCreditCards[cardNumber];
            await AsyncStorage.setItem(
              "@StreetPay_CreditCards",
              JSON.stringify(allCreditCards)
            );
            goBack();
          }}
        >
          <Text>{t("removeCreditCard")}</Text>
        </Button>
      </Content>
    </Container>
  );
}
