import * as React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const PATTERNS = ["#1D9C89", "#8BD6C2", "#EDE080", "#FC451E"];

export default function Backdrop({ pattern }) {
  return (
    <LinearGradient
      style={StyleSheet.absoluteFill}
      colors={["#240340", pattern]}
    />
  );
}
