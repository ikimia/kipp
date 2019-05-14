import React from "react";
import * as PropTypes from "prop-types";
import { Text } from "react-native";

export default function AlignedText({ children, style, ...props }) {
  return (
    <Text style={[{ textAlign: "left" }, style]} {...props}>
      {children}
    </Text>
  );
}
AlignedText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  props: PropTypes.object
};
