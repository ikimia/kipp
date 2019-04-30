import React from "react";
import { View } from "react-native";

import { useTranslation } from "react-i18next";
import { Text } from "native-base";

const LINE_LENGTH = 32;

/** @type {"left"} */
const TEXT_ALIGN_LEFT = "left";
const lineTextStyle = {
  fontFamily: "Courier",
  textAlign: TEXT_ALIGN_LEFT
};
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

/**
 * @param {object} props
 * @param {any[]} props.elements
 * @param {boolean=} props.bold
 */
const Line = ({ elements, bold }) => (
  <Text style={bold ? boldLineTextStyle : lineTextStyle}>
    {toText(elements)}
  </Text>
);

/**
 * @typedef {{description: string, count: number, price: number}} Item
 * @param {{items: Item[], taxes: number}} props
 */
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
