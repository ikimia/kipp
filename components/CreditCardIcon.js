import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CC_TESTERS = [
  [/^4/, "cc-visa"],
  [/^5\d/, "cc-mastercard"],
  [/^37/, "cc-amex"],
  [/^36/, "cc-diners-club"]
];
function getCreditCardIcon(cardNumber) {
  for (const [pattern, iconName] of CC_TESTERS) {
    if (pattern.test(cardNumber)) {
      return iconName;
    }
  }
  return "credit-card-alt";
}

export default function CreditCardIcon({ cardNumber, style }) {
  return <Icon name={getCreditCardIcon(cardNumber)} style={style} />;
}
