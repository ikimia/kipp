import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";

import StyleSheets from "../constants/StyleSheets";
import Colors from "../constants/Colors";
import { withNamespaces } from "react-i18next";

class ReceiptItemsTable extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        count: PropTypes.number
      })
    ),
    taxes: PropTypes.number
  };

  render() {
    const { t } = this.props;
    const total = this.props.items
      .map(({ count, price }) => count * price)
      .reduce((a, b) => a + b, 0);
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={style.row}>
          <Text style={[StyleSheets.f2, StyleSheets.textBold]}>
            {t("description")}
          </Text>
          <Text style={[StyleSheets.f1, StyleSheets.textBold]}>
            {t("count")}
          </Text>
          <Text style={[StyleSheets.f1, StyleSheets.textBold]}>
            {t("price")}
          </Text>
          <Text style={[StyleSheets.f1, StyleSheets.textBold]}>
            {t("amount")}
          </Text>
        </View>
        {this.props.items.map(({ description, count, price }) => (
          <View key={description} style={style.row}>
            <Text style={StyleSheets.f2}>{description}</Text>
            <Text style={StyleSheets.f1}>{count}</Text>
            <Text style={StyleSheets.f1}>${price}</Text>
            <Text style={StyleSheets.f1}>${count * price}</Text>
          </View>
        ))}
        <View
          style={[
            style.row,
            { borderBottomWidth: 1, borderBottomColor: Colors.borderColor }
          ]}
        >
          <Text style={[StyleSheets.textBold, StyleSheets.f4]}>
            {t("taxes")}
          </Text>
          <Text style={[StyleSheets.textBold, StyleSheets.f1]}>
            ${this.props.taxes}
          </Text>
        </View>
        <View style={[style.row, StyleSheets.mt4]}>
          <Text style={[StyleSheets.textBold, StyleSheets.f4]}>Total</Text>
          <Text style={[StyleSheets.textBold, StyleSheets.f1]}>
            ${total + this.props.taxes}
          </Text>
        </View>
      </View>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(ReceiptItemsTable);

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
