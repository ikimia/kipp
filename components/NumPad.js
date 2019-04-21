import React from "react";
import PropTypes from "prop-types";
import { View, Icon, Text } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NumPad({ onPress }) {
  return (
    <View style={{ flex: 1, direction: "ltr" }}>
      {[
        [..."123"],
        [..."456"],
        [..."789"],
        [" ", "0", <Icon key="bs" name="backspace" />]
      ].map((row, i) => (
        <View
          key={`row-${i}`}
          style={{
            flexDirection: "row",
            flex: 1
          }}
        >
          {row.map(digit => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
              key={digit}
            >
              <TouchableOpacity
                onPress={() => {
                  if ("1234567890".includes(digit)) {
                    onPress(digit);
                  } else if (digit !== " ") {
                    onPress("Backspace");
                  }
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 50,
                    fontWeight: "bold",
                    paddingVertical: 20,
                    paddingHorizontal: 40
                  }}
                >
                  {digit}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
NumPad.propTypes = {
  onPress: PropTypes.func.isRequired
};
