import React, { useContext, useState } from "react";
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
  Text,
  Icon,
  View
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import ArrowIcon from "../components/ArrowIcon";
import AlignedText from "../components/AlignedText";
import { getCreditCardIcon } from "./CreditCardFunctions";
import { NavigationEvents, NavigationContext } from "react-navigation";
import { CreditCardStorage } from "../Storage";

export default function PaymentSettingsScreen() {
  const navigation = useContext(NavigationContext);
  const { t } = useTranslation("settings");
  const [storedPaymentMethods, setStoredPaymentMethods] = useState([]);
  return (
    <Container>
      <NavigationEvents
        onWillFocus={() => {
          CreditCardStorage.getAll().then(creditCards => {
            setStoredPaymentMethods(
              creditCards.map(([cardNumber]) => cardNumber)
            );
          });
        }}
      />
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
        <List style={{ backgroundColor: "white" }}>
          {storedPaymentMethods.length > 0 && (
            <View>
              <ListItem itemDivider />
              <ListItem itemDivider>
                <Text>{t("savedPaymentMethods")}</Text>
              </ListItem>
              {storedPaymentMethods.map((cardNumber, i) => (
                <ListItem
                  key={cardNumber}
                  noIndent
                  icon
                  last={i === storedPaymentMethods.length - 1}
                  onPress={() =>
                    navigation.navigate("SavedCreditCard", { cardNumber })
                  }
                >
                  <Left>
                    <Icon
                      type="FontAwesome"
                      name={getCreditCardIcon(cardNumber)}
                      style={{ width: 36, fontSize: 28 }}
                    />
                  </Left>
                  <Body>
                    <AlignedText>{cardNumber.slice(-4)}</AlignedText>
                  </Body>
                  <Right>
                    <ArrowIcon />
                  </Right>
                </ListItem>
              ))}
            </View>
          )}
          <ListItem itemDivider />
          <ListItem itemDivider>
            <Text>{t("addPaymentMethods")}</Text>
          </ListItem>
          <ListItem
            noIndent
            icon
            last
            onPress={() => navigation.navigate("NewCreditCard")}
          >
            <Body>
              <AlignedText>{t("newCreditCardAction")}</AlignedText>
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
