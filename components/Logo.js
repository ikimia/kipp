import * as React from "react";
import * as PropTypes from "prop-types";
import { View, Text } from "react-native";

export default function Logo({ fontSize = 20 }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ fontFamily: "Baumans", fontSize }}>Kipp</Text>
    </View>
  );
}
Logo.propTypes = {
  fontSize: PropTypes.number
};
