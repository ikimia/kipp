import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import { Text } from "native-base";

const LINE_LENGTH = 32;

const lineTextStyle = { fontFamily: "Courier", textAlign: "left" };
const boldLineTextStyle = { ...lineTextStyle, fontWeight: "bold" };

const PAD = Symbol();
const toText = elements => {
  const textLength = elements
    .filter(e => e !== PAD)
    .map(e => String(e).length)
    .reduce((a, b) => a + b, 0);
  const padLength = LINE_LENGTH - textLength;
  return elements.map(e => (e === PAD ? " ".repeat(padLength) : e)).join("");
};

const Line = ({ elements, bold }) => (
  <Text style={bold ? boldLineTextStyle : lineTextStyle}>
    {toText(elements)}
  </Text>
);
Line.propTypes = {
  elements: PropTypes.array.isRequired,
  bold: PropTypes.bool
};

export default function ReceiptItemsTable({ items, taxes }) {
  const { t } = useTranslation("common");
  const total = items
    .map(({ count, price }) => count * price)
    .reduce((a, b) => a + b, 0);

  return (
    <View>
      {items.map(({ description, count, price }, i) => [
        <Line
          key={i}
          elements={[t(`stores:${description}`), PAD, count * price]}
        />,
        count > 1 ? (
          <Line
            bold
            key={`${i}-comment`}
            elements={["  ", `${count} * ${price} ${t("perUnit")}`]}
          />
        ) : null
      ])}
      <Line elements={["-".repeat(LINE_LENGTH)]} />
      <Line elements={[PAD, t("taxes"), "   ", taxes]} />
      <Line
        bold
        elements={[PAD, t("total"), "  ", t("currencySign"), total + taxes]}
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
