import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

export default function CodeInput({ value, size }) {
  return (
    <View style={[styles.code, { direction: "ltr" }]}>
      {new Array(size).fill(null).map((_, i) => (
        <View key={i} style={styles.receiptNumber}>
          <Text style={styles.digit}>{value[i] || ""}</Text>
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
  code: {
    display: "flex",
    flexDirection: "row"
  },
  receiptNumber: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 50,
    borderColor: "black",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "#d3d3d3"
  },
  digit: {
    fontSize: 30
  }
});
