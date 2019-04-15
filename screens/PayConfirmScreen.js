import React, { Component } from "react";
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
  Right
} from "native-base";
import { View } from "react-native";
import StyleSheets from "../constants/StyleSheets";
import ReceiptItemsTable from "../components/ReceiptItemsTable";

import BigPriceBanner from "../components/BigPriceBanner";

import { items, storeName, taxes, totalAmount } from "../constants/Data";
import { withNamespaces } from "react-i18next";

class PayConfirmScreen extends Component {
  state = {
    storeName,
    items,
    taxes
  };

  render() {
    const { navigation, t } = this.props;
    const { navigate, goBack } = navigation;
    const receiptNumber = navigation.getParam("receiptNumber", "NO-ID");
    return (
      <Container style={StyleSheets.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => goBack()}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Confirm</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <BigPriceBanner
            price={totalAmount}
            receiptNumber={receiptNumber}
            storeName={this.state.storeName}
          />
          <View>
            <View style={[StyleSheets.pt5, StyleSheets.f1]}>
              <Button
                onPress={() => navigate("ProcessTransactionScreen")}
                title={"Make Payment"}
                success
                style={[StyleSheets.button, { height: 100 }]}
              >
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
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {[
                { text: "cancel", danger: true, icon: "md-close", to: "Pay" },
                { text: "split", info: true, icon: "md-people" },
                { text: "addTip", warning: true, icon: "ios-calculator" }
              ].map(item => (
                <Button
                  key={item.text}
                  iconLeft
                  danger={item.danger}
                  info={item.info}
                  warning={item.warning}
                  style={[StyleSheets.button, StyleSheets.m2]}
                  onPress={() => navigate(item.to)}
                  title={item.text}
                >
                  <Icon name={item.icon} />
                  <Text
                    style={[
                      StyleSheets.textCenter,
                      StyleSheets.textSize2,
                      StyleSheets.textBold
                    ]}
                  >
                    {t(`${item.text}`)}
                  </Text>
                </Button>
              ))}
            </View>
            <View style={[StyleSheets.p5, StyleSheets.f1]}>
              <ReceiptItemsTable
                items={this.state.items}
                taxes={this.state.taxes}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(PayConfirmScreen);
