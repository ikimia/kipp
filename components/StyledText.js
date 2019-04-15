import React from "react";
import { Text, ViewPropTypes } from "react-native";

export class MonoText extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style
  };

  render() {
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontFamily: "space-mono" }]}
      />
    );
  }
}
