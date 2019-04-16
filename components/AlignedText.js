import React from "react";
import * as PropTypes from "prop-types";
import { Text } from "native-base";

export default function AlignedText({ children, style, ...props }) {
  return (
    <Text style={[{ textAlign: "left" }, style]} {...props}>
      {children}
    </Text>
  );
}
AlignedText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  props: PropTypes.object
};
