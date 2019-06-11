import * as React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const TOUR_PATTERN = ["#191654", "#43C6AC"];

export const PATTERNS = [
  ["#514A9D", "#24C6DC"],
  ["#283048", "#859398"],
  ["#232526", "#414345"],
  ["#5C258D", "#4389A2"],
  ["#134E5E", "#71B280"],
  ["#085078", "#85D8CE"],
  ["#8E54E9", "#4776E6"],
  ["#516395", "#614385"],
  ["#1F1C2C", "#928DAB"],
  ["#16222A", "#3A6073"],
  ["#1D976C", "#93F9B9"],
  ["#F45C43", "#EB3349"],
  ["#1A2980", "#26D0CE"],
  ["#403B4A", "#E7E9BB"],
  ["#093637", "#44A08D"],
  ["#000046", "#1CB5E0"]
];

export default function Backdrop({ pattern }) {
  return <LinearGradient style={StyleSheet.absoluteFill} colors={pattern} />;
}
