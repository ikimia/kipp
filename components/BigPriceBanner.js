import React, { Component } from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import StyleSheets from "../constants/StyleSheets";

import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

class BigPriceBanner extends Component {
  state = {};

  static propTypes = {
    price: PropTypes.number.isRequired,
    receiptNumber: PropTypes.number.isRequired,
    storeName: PropTypes.string.isRequired
  };

  render() {
    const { t } = this.props;
    return (
      <View style={{ backgroundColor: "#a579dc" }}>
        <View style={styles.priceCard}>
          <View>
            <Text style={[StyleSheets.textCenter, { color: Colors.white }]}>
              {t("pay:makePaymentFor")}
            </Text>
            <Text
              style={[
                StyleSheets.textCenter,
                StyleSheets.textSize4,
                StyleSheets.mt4,
                { color: Colors.white }
              ]}
            >
              {this.props.storeName}
            </Text>
          </View>
          <Text style={styles.bigText}>${this.props.price}</Text>
          <Text style={{ color: Colors.white }}>
            {this.props.receiptNumber}
          </Text>
        </View>
      </View>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(BigPriceBanner);

const styles = StyleSheet.create({
  priceCard: {
    flex: 20,
    alignItems: "center",
    justifyContent: "space-around",
    height: 300
  },
  bigText: {
    fontSize: 120,
    color: Colors.white
  }
});
