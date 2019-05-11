import * as React from "react";
import * as PropTypes from "prop-types";
import { View, Text } from "react-native";
import BackButton from "./BackButton";

export default function DarkHeader({ title, back = false }) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "center",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1
      }}
    >
      <View style={{ flex: 1 }}>{back && <BackButton />}</View>
      <View style={{ flex: 3, alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
}
DarkHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool
};
