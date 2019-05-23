import * as React from "react";
import { Image } from "react-native";

const IMAGES = {
  visa: require("../assets/img/visa.png"),
  mastercard: require("../assets/img/mastercard.png"),
  amex: require("../assets/img/amex.png"),
  dinersclub: require("../assets/img/dinersclub.png"),
  blank: require("../assets/img/blank.png")
};

const CC_TESTERS = [
  [/^4/, IMAGES.visa],
  [/^5\d/, IMAGES.mastercard],
  [/^37/, IMAGES.amex],
  [/^36/, IMAGES.dinersclub]
];
function getCreditCardIcon(cardNumber) {
  if (cardNumber) {
    for (const [pattern, source] of CC_TESTERS) {
      if (pattern.test(cardNumber)) {
        return source;
      }
    }
  }
  return IMAGES.blank;
}

export default function CreditCardIcon({ cardNumber, style }) {
  return (
    <Image
      source={getCreditCardIcon(cardNumber)}
      style={[{ width: 24, height: 15 }, style]}
    />
  );
}
