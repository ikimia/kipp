import React from "react";
import * as PropTypes from "prop-types";
import { Text } from "native-base";
import { useDirection, RTL } from "../hooks/direction";
import { useTranslation } from "react-i18next";

export default function CurrencyText({ children, style, ...props }) {
  const { t } = useTranslation("common");
  const isRTL = useDirection() === RTL;
  return (
    <Text style={[{ textAlign: "left" }, style]} {...props}>
      {isRTL ? null : t("currencySign")}
      {children}
      {isRTL ? t("currencySign") : null}
    </Text>
  );
}

CurrencyText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  props: PropTypes.object
};
