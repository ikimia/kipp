import * as React from "react";
import * as PropTypes from "prop-types";
import { Header, Left, Body, Title, Right } from "native-base";
import { OFFWHITE, DARK_GRAY } from "../constants/Colors";

export default function DarkHeader({ title }) {
  return (
    <Header style={{ backgroundColor: DARK_GRAY }} iosBarStyle="light-content">
      <Left />
      <Body>
        <Title style={{ color: OFFWHITE }}>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}
DarkHeader.propTypes = {
  title: PropTypes.string.isRequired
};
