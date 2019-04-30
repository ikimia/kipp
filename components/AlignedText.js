import React from "react";
import { Text } from "native-base";

/**
 * @typedef {import("react-native").TextStyle} TextStyle
 * @typedef {import("react-native").StyleProp<TextStyle>} TextStyleProp
 * @param {object} props
 * @param {React.ReactChildren=} props.children
 * @param {TextStyleProp=} props.style
 */
export default function AlignedText({ children, style, ...props }) {
  return (
    <Text style={[{ textAlign: "left" }, style]} {...props}>
      {children}
    </Text>
  );
}
