import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { getCreditCardIcon } from "../screens/CreditCardFunctions";

export default function CreditCardIcon({ cardNumber, style }) {
  return <Icon name={getCreditCardIcon(cardNumber)} style={style} />;
}
