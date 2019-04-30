import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import { useDirection, RTL } from "../hooks/direction";
import { OFFWHITE } from "../constants/Colors";

export default function ArrowIcon({ back = false }) {
  const appDirection = useDirection();
  const direction = ["back", "forward"][+!back ^ +(appDirection === RTL)];
  return <Icon name={`arrow-${direction}`} style={{ color: OFFWHITE }} />;
}
ArrowIcon.propTypes = {
  back: PropTypes.bool
};
