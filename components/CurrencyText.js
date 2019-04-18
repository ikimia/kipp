import React from "react";
import * as PropTypes from "prop-types";
import { Text } from "native-base";
import { useTranslation } from "react-i18next";

export default function CurrencyText({ children, style, ...props }) {
  const { t } = useTranslation("common");
  return (
    <Text style={[{ textAlign: "left" }, style]} {...props}>
      {t("currencySign")}
      {children}
    </Text>
  );
}

CurrencyText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  props: PropTypes.object
};
