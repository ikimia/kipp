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

const formatCardNumber = cardNumber =>
  cardNumber ? cardNumber.match(/.{1,4}/g).join(" ") : "";

const formatDate = date => (date ? date.match(/.{1,2}/g).join("/") : "");

const CC_TESTERS = [
  [/^4/, "cc-visa"],
  [/^5\d/, "cc-mastercard"],
  [/^37/, "cc-amex"],
  [/^36/, "cc-diners-club"]
];
function getCreditCardIcon(cardNumber) {
  for (const [pattern, iconName] of CC_TESTERS) {
    if (pattern.test(cardNumber)) {
      return iconName;
    }
  }
  return "credit-card";
}

export default function NewCreditCardScreen() {
  const { t } = useTranslation("settings");
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
          <Title>{t("newCreditCard")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <Form>
          <Item inlineLabel>
            <Label>Card Number</Label>
            <Input
              keyboardType="decimal-pad"
              value={formatCardNumber(cardNumber)}
              onChangeText={newText => {
                setCardNumber(newText.replace(/ /g, ""));
              }}
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
            />
            <Icon type="FontAwesome" name={getCreditCardIcon(cardNumber)} />
          </Item>
          <Item inlineLabel>
            <Label>Expiration</Label>
            <Input
              keyboardType="decimal-pad"
              placeholder="MM/YY"
              maxLength={5}
              value={formatDate(expirationDate)}
              onChangeText={newText => {
                setExpirationDate(newText.replace(/\//g, ""));
              }}
            />
          </Item>
          <Item inlineLabel last>
            <Label>CVV</Label>
            <Input
              keyboardType="decimal-pad"
              placeholder="•••"
              maxLength={3}
              value={cvv}
              onChangeText={setCVV}
            />
          </Item>
        </Form>
        <Button
          full
          disabled={!cardNumber || !expirationDate || !cvv}
          style={{ marginTop: 20 }}
          onPress={() => goBack()}
        >
          <Text>Save</Text>
        </Button>
      </Content>
    </Container>
  );
}
