import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

export default function CodeInput({ value, size }) {
  return (
    <View style={[styles.view, { direction: "ltr" }]}>
      {[...Array(size)].map((_, i) => (
        <View key={i} style={styles.digit}>
          <Text style={styles.digitText}>{value[i] || "•"}</Text>
        </View>
      ))}
    </View>
  );
}
CodeInput.propTypes = {
  size: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    width: "80%"
  },
  digit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  digitText: {
    fontSize: 45
  }
});
