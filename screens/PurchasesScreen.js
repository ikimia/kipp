import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Purchases from "../components/Purchases";
import { SafeAreaView } from "react-navigation";

export default function PurchasesScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#FAFAFA",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View>
          <Text
            style={[
              styles.boldText,
              {
                marginVertical: 10,
                marginHorizontal: 15,
                fontSize: 30
              }
            ]}
          >
            Receipts
          </Text>
        </View>
      </SafeAreaView>
      <Purchases />
    </View>
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
