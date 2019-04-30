import React from "react";
import { Text } from "native-base";

/**
 * @typedef {import("react-native").TextStyle} TextStyle
 * @typedef {import("react-native").StyleProp<TextStyle>} TextStyleProp
 * @param {object} props
 * @param {React.ReactChildren=} props.children
 * @param {TextStyleProp=} props.style
 * @param {boolean=} props.note
 */
export default function AlignedText({ children, style, note }) {
  return (
    <Text style={[{ textAlign: "left" }, style]} note={note}>
      {children}
    </Text>
  );
}
