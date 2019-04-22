import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Header,
  Body,
  Title,
  Right,
  Card,
  CardItem
} from "native-base";
import { View } from "react-native";
import StyleSheets from "../constants/StyleSheets";
import ReceiptItemsTable from "../components/ReceiptItemsTable";
import { gray } from "open-color";

import { items, taxes, totalAmount } from "../constants/Data";
import { useTranslation } from "react-i18next";
import ArrowIcon from "../components/ArrowIcon";
import { SafeAreaView, NavigationContext } from "react-navigation";

export default function OrderScreen({ receiptNumber, storeName, hidePayment }) {
  const { t } = useTranslation("common");
  const { goBack, navigate } = useContext(NavigationContext);
  return (
    <Container>
      <View style={{ backgroundColor: gray[9] }}>
        <Header transparent iosBarStyle="light-content">
          <Left>
            <Button transparent light onPress={() => goBack()}>
              <ArrowIcon back />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "white" }}>Pay</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10
            }}
          >
            <Text style={{ color: "white", fontSize: 25, fontWeight: "900" }}>
              {t(`stores:${storeName}`)}
            </Text>
            <Text style={{ color: "white", fontSize: 25, fontWeight: "900" }}>
              {t("currencySign")}
              {totalAmount}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Icon
              name="information-circle"
              style={{ color: "white", fontSize: 15, marginEnd: 5 }}
            />
            <Text style={{ color: "white", fontSize: 15 }}>
              Receipt no. {receiptNumber}
            </Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 15 }}>
          <Content contentContainerStyle={{ alignItems: "center" }}>
            <Card>
              <CardItem>
                <ReceiptItemsTable items={items} taxes={taxes} />
              </CardItem>
            </Card>
          </Content>
          {!hidePayment && (
            <Button onPress={() => navigate("ProcessTransactionScreen")} block>
              <Text
                style={[
                  StyleSheets.textCenter,
                  StyleSheets.textSize3,
                  StyleSheets.textBold
                ]}
              >
                {t("pay:makePayment")}
              </Text>
            </Button>
          )}
        </View>
      </SafeAreaView>
    </Container>
  );
}
OrderScreen.propTypes = {
  receiptNumber: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  hidePayment: PropTypes.bool
};
