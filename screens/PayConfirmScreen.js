import React from "react";
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
import CurrencyText from "../components/CurrencyText";
import ArrowIcon from "../components/ArrowIcon";
import { SafeAreaView } from "react-navigation";

export default function PayConfirmScreen({ navigation }) {
  const { t } = useTranslation("common");
  const { navigate } = navigation;
  const receiptNumber = navigation.getParam("receiptNumber", "NO-ID");
  const storeName = "apparelStore";
  return (
    <Container>
      <View style={{ backgroundColor: gray[9] }}>
        <Header transparent iosBarStyle="light-content">
          <Left>
            <Button transparent light onPress={() => navigate("Pay")}>
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
            <CurrencyText
              style={{ color: "white", fontSize: 25, fontWeight: "900" }}
            >
              {totalAmount}
            </CurrencyText>
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
            <Card transparent>
              <CardItem>
                <ReceiptItemsTable items={items} taxes={taxes} />
              </CardItem>
            </Card>
          </Content>
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
        </View>
      </SafeAreaView>
    </Container>
  );
}
