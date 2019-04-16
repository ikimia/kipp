import React from "react";
import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import StyleSheets from "../constants/StyleSheets";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function BigPriceBanner({ price, receiptNumber, storeName }) {
  const { t } = useTranslation("common");
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
            {storeName}
          </Text>
        </View>
        <Text style={styles.bigText}>${price}</Text>
        <Text style={{ color: Colors.white }}>{receiptNumber}</Text>
      </View>
    </View>
  );
}
BigPriceBanner.propTypes = {
  price: PropTypes.number.isRequired,
  receiptNumber: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired
};

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
