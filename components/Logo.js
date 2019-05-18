import * as React from "react";
import * as PropTypes from "prop-types";
import { View, Text } from "react-native";

export default function Logo({ fontSize = 20, color }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ fontFamily: "Baumans", fontSize, color }}>Kipp</Text>
    </View>
  );
}
Logo.propTypes = {
  fontSize: PropTypes.number
};
