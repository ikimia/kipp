import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import { useDirection, RTL } from "../hooks/direction";

export default function ArrowIcon({ back = false }) {
  const appDirection = useDirection();
  const direction = ["back", "forward"][+!back ^ +(appDirection === RTL)];
  return <Icon name={`arrow-${direction}`} />;
}
ArrowIcon.propTypes = {
  back: PropTypes.bool
};
