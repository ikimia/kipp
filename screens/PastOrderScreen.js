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

export default class PastOrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storeName, items, taxes };
  }

  render() {
    return (
      <Container style={StyleSheets.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text>Purchases</Text>
            </Button>
          </Left>
        </Header>
        <Content>
          <BigPriceBanner
            price={totalAmount}
            receiptNumber=""
            storeName={this.state.storeName}
          />
          <View style={[StyleSheets.p5, StyleSheets.f1]}>
            <ReceiptItemsTable
              items={this.state.items}
              taxes={this.state.taxes}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
