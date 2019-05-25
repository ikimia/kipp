import * as React from "react";
import * as PropTypes from "prop-types";
import StyledText from "./StyledText";

export default function Logo({ fontSize = 20, color }) {
  return (
    <StyledText fontFamily="Baumans" size={fontSize} color={color}>
      Kipp
    </StyledText>
  );
}
Logo.propTypes = {
  fontSize: PropTypes.number
};
