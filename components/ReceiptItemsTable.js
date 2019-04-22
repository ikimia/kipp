import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import { Text } from "native-base";

const LINE_LENGTH = 32;

const lineTextStyle = { fontFamily: "Courier", textAlign: "left" };
const boldLineTextStyle = { ...lineTextStyle, fontWeight: "bold" };

/* eslint-disable react/prop-types */
const ItemLine = ({ item, price }) => (
  <Text style={lineTextStyle}>
    {item}
    {" ".repeat(LINE_LENGTH - item.length - price.length)}
    {price}
  </Text>
);
const CommentLine = ({ comment }) => (
  <Text style={boldLineTextStyle}>
    {"  "}
    {comment}
  </Text>
);
const DividerLine = () => (
  <Text style={lineTextStyle}>{"-".repeat(LINE_LENGTH)}</Text>
);
const SummaryLine = ({ label, amount, bold, showCurrency }) => {
  const { t } = useTranslation("common");
  return (
    <Text style={bold ? boldLineTextStyle : lineTextStyle}>
      {" ".repeat(LINE_LENGTH - label.length - amount.length - 3)}
      {label}
      {"  "}
      {showCurrency ? t("currencySign") : " "}
      {amount}
    </Text>
  );
};
/* eslint-enable */

const s = n => "" + n;
export default function ReceiptItemsTable({ items, taxes }) {
  const { t } = useTranslation("common");
  const total = items
    .map(({ count, price }) => count * price)
    .reduce((a, b) => a + b, 0);
  return (
    <View>
      {items.map(({ description, count, price }) => (
        <View key={description}>
          <ItemLine
            item={t(`stores:${description}`)}
            price={s(count * price)}
          />
          {count > 1 && (
            <CommentLine comment={`${count} * ${price} ${t("perUnit")}`} />
          )}
        </View>
      ))}
      <DividerLine />
      <SummaryLine label={t("taxes")} amount={s(taxes)} />
      <SummaryLine
        bold
        showCurrency
        label={t("total")}
        amount={s(total + taxes)}
      />
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
