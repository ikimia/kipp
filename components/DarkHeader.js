import * as React from "react";
import * as PropTypes from "prop-types";
import { View, Text } from "react-native";
import BackButton from "./BackButton";

export default function DarkHeader({ title, back = false }) {
  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: "#EEE",
        borderBottomWidth: 1
      }}
    >
      {back && (
        <View style={{ marginBottom: 5 }}>
          <BackButton />
        </View>
      )}
      <View>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{title}</Text>
      </View>
    </View>
  );
}
DarkHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool
};
