import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, RectButton } from "react-native-gesture-handler";

const COLORS = [
  "#ff9f43",
  "#ee5253",
  "#5f27cd",
  "#2e86de",
  "#222f3e",
  "#10ac84",
  "#01a3a4",
  "#f368e0"
];

export default function ItemList({
  items,
  onPress,
  getItemTitle,
  getItemText,
  getItemSecondaryText,
  getItemSecondaryTextImportant,
  getSideText
}) {
  return (
    <FlatList
      data={items}
      keyExtractor={(_, i) => `${i}`}
      renderItem={({ item, index: i }) => (
        <RectButton
          onPress={() => onPress(item)}
          style={{ backgroundColor: "white" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ padding: 15 }}>
              <View
                style={[
                  // styles.shadow,
                  {
                    height: 50,
                    width: 50,
                    borderRadius: 10,
                    backgroundColor: COLORS[i % COLORS.length],
                    alignItems: "center",
                    justifyContent: "center"
                  }
                ]}
              >
                <Text
                  style={[styles.boldText, { color: "white", fontSize: 20 }]}
                >
                  {getItemTitle(item).slice(0, 1)}
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
                <Text style={[styles.boldText, { fontSize: 16 }]}>
                  {getItemTitle(item)}
                </Text>
                <Text style={[styles.text, { fontSize: 12 }]}>
                  {getItemText(item)}
                </Text>
                {getItemSecondaryText && (
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 12,
                        color: "#333",
                        fontStyle: "italic",
                        marginTop: 5,
                        ...((getItemSecondaryTextImportant &&
                          getItemSecondaryTextImportant(item) && {
                            fontWeight: "bold",
                            color: "darkred"
                          }) ||
                          undefined)
                      }
                    ]}
                  >
                    {getItemSecondaryText(item)}
                  </Text>
                )}
              </View>
              <Text style={[styles.text, { fontSize: 20 }]}>
                {getSideText(item)}
              </Text>
            </View>
          </View>
        </RectButton>
      )}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans"
  },
  boldText: {
    fontFamily: "Open Sans",
    fontWeight: "bold"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
});
