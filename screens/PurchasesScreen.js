import * as React from "react";
import { View } from "react-native";
import Purchases from "../components/Purchases";
import { SafeAreaView } from "react-navigation";
import StyledText from "../components/StyledText";

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
          <StyledText
            bold
            size={30}
            style={{
              marginVertical: 10,
              marginHorizontal: 15
            }}
          >
            Receipts
          </StyledText>
        </View>
      </SafeAreaView>
      <Purchases />
    </View>
  );
}
