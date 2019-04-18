const CC_TESTERS = [
  [/^4/, "cc-visa"],
  [/^5\d/, "cc-mastercard"],
  [/^37/, "cc-amex"],
  [/^36/, "cc-diners-club"]
];
export function getCreditCardIcon(cardNumber) {
  for (const [pattern, iconName] of CC_TESTERS) {
    if (pattern.test(cardNumber)) {
      return iconName;
    }
  }
  return "credit-card";
}
