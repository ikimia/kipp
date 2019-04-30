import * as React from "react";
import * as PropTypes from "prop-types";
import { Header, Left, Body, Title, Right } from "native-base";
import { OFFWHITE, DARK_GRAY } from "../constants/Colors";
import BackButton from "./BackButton";

export default function DarkHeader({ title, back = false }) {
  return (
    <Header
      style={{ backgroundColor: DARK_GRAY, borderBottomWidth: 0 }}
      iosBarStyle="light-content"
    >
      <Left>{back && <BackButton />}</Left>
      <Body>
        <Title style={{ color: OFFWHITE }}>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
}
DarkHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool
};
