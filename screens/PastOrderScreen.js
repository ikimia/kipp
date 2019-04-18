import React from "react";
import { View } from "react-native";
import { Container, Content, Left, Header, Right } from "native-base";

import StyleSheets from "../constants/StyleSheets";
import BigPriceBanner from "../components/BigPriceBanner";
import ReceiptItemsTable from "../components/ReceiptItemsTable";
import { items, storeName, taxes, totalAmount } from "../constants/Data";
import BackButton from "../components/BackButton";
import ShareButton from "../components/ShareButton";

export default function PastOrderScreen() {
  return (
    <Container style={StyleSheets.container}>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Right>
          <ShareButton />
        </Right>
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
