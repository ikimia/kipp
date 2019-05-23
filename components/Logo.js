import * as React from "react";
import * as PropTypes from "prop-types";
import { View } from "react-native";
import StyledText from "./StyledText";

export default function Logo({ fontSize = 20, color }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <StyledText fontFamily="Baumans" size={fontSize} color={color}>
        Kipp
      </StyledText>
    </View>
  );
}
Logo.propTypes = {
  fontSize: PropTypes.number
};
