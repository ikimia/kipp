import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const COLORS = [
  "#ff9f43",
  "#ee5253",
  "#5f27cd",
  "#2e86de",
  "#222f3e",
  "#10ac84",
  "#01a3a4",
  "#f368e0"
];

export default function ItemListItem({
  onPress,
  color,
  logo,
  title,
  text,
  secondaryText,
  secondaryTextImportant,
  sideText
}) {
  return (
    <RectButton onPress={onPress} style={{ backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ padding: 15 }}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              backgroundColor: color,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={[styles.boldText, { color: "white", fontSize: 20 }]}>
              {logo}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "stretch",
            padding: 15,
            paddingStart: 0,
            borderBottomColor: "#EEE",
            borderBottomWidth: 1,
            alignItems: "center"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.boldText, { fontSize: 16 }]}>{title}</Text>
            <Text style={[styles.text, { fontSize: 12 }]}>{text}</Text>
            {secondaryText && (
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    color: "#333",
                    fontStyle: "italic",
                    marginTop: 5,
                    ...(secondaryTextImportant
                      ? {
                          fontWeight: "bold",
                          color: "darkred"
                        }
                      : undefined)
                  }
                ]}
              >
                {secondaryText}
              </Text>
            )}
          </View>
          <Text style={[styles.text, { fontSize: 20 }]}>{sideText}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans"
  },
  boldText: {
    fontFamily: "Open Sans",
    fontWeight: "bold"
  }
});
