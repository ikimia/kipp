import React from "react";
import { View } from "react-native";
import {
  Button,
  Container,
  Content,
  Icon,
  Left,
  Header,
  Text
} from "native-base";
import StyleSheets from "../constants/StyleSheets";
import BigPriceBanner from "../components/BigPriceBanner";
import ReceiptItemsTable from "../components/ReceiptItemsTable";
import { items, storeName, taxes, totalAmount } from "../constants/Data";

export default function PastOrderScreen({ navigation }) {
  return (
    <Container style={StyleSheets.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
            <Text>Purchases</Text>
          </Button>
        </Left>
      </Header>
      <Content>
        <BigPriceBanner
          price={totalAmount}
          receiptNumber=""
          storeName={storeName}
        />
        <View style={[StyleSheets.p5, StyleSheets.f1]}>
          <ReceiptItemsTable items={items} taxes={taxes} />
        </View>
      </Content>
    </Container>
  );
}
