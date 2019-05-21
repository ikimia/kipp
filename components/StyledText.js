import React from "react";
import { Text } from "react-native";

export default function StyledText({
  children,
  style,
  color,
  fontFamily,
  align,
  size,
  bold = false,
  underline = false,
  ...props
}) {
  return (
    <Text
      style={[
        {
          color,
          fontFamily: fontFamily || "Open Sans",
          textAlign: align || "left",
          fontWeight: bold ? "bold" : undefined,
          fontSize: size,
          textDecorationLine: underline ? "underline" : undefined
        },
        style
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
