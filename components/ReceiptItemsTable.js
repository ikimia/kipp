import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import StyleSheets from "../constants/StyleSheets";
import Colors from "../constants/Colors";
import { useTranslation } from "react-i18next";
import AlignedText from "./AlignedText";
import CurrencyText from "./CurrencyText";

const { f1, f2, textBold, mt4, f4 } = StyleSheets;

export default function ReceiptItemsTable({ items, taxes }) {
  const { t } = useTranslation("common");
  const total = items
    .map(({ count, price }) => count * price)
    .reduce((a, b) => a + b, 0);
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={style.row}>
        <AlignedText style={[f2, textBold]}>{t("description")}</AlignedText>
        <AlignedText style={[f1, textBold]}>{t("count")}</AlignedText>
        <AlignedText style={[f1, textBold]}>{t("price")}</AlignedText>
        <AlignedText style={[f1, textBold]}>{t("amount")}</AlignedText>
      </View>
      {items.map(({ description, count, price }) => (
        <View key={description} style={style.row}>
          <AlignedText style={f2}>{t(`stores:${description}`)}</AlignedText>
          <AlignedText style={f1}>{count}</AlignedText>
          <AlignedText style={f1}>
            <CurrencyText>{price}</CurrencyText>
          </AlignedText>
          <AlignedText style={f1}>
            <CurrencyText>{count * price}</CurrencyText>
          </AlignedText>
        </View>
      ))}
      <View
        style={[
          style.row,
          { borderBottomWidth: 1, borderBottomColor: Colors.borderColor }
        ]}
      >
        <AlignedText style={[textBold, f4]}>{t("taxes")}</AlignedText>
        <AlignedText style={[textBold, f1]}>
          <CurrencyText>{taxes}</CurrencyText>
        </AlignedText>
      </View>
      <View style={[style.row, mt4]}>
        <AlignedText style={[textBold, f4]}>{t("total")}</AlignedText>
        <AlignedText style={[textBold, f1]}>
          <CurrencyText>{total + taxes}</CurrencyText>
        </AlignedText>
      </View>
    </View>
  );
}
ReceiptItemsTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      count: PropTypes.number
    })
  ),
  taxes: PropTypes.number
};

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
