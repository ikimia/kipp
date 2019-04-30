import React from "react";
import { Icon } from "native-base";
import { useDirection, RTL } from "../hooks/direction";

/**
 * @param {object} props
 * @param {boolean=} props.back
 * */
export default function ArrowIcon({ back = false }) {
  const appDirection = useDirection();
  const direction = ["back", "forward"][+!back ^ +(appDirection === RTL)];
  return <Icon name={`arrow-${direction}`} />;
}
