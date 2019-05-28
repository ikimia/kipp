import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import BackButton from "./BackButton";
import StyledText from "./StyledText";

export default function SmallHeader({ title, right }) {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 15,
        backgroundColor: "#FAFAFA",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1
      }}
    >
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 1 }}>
          <BackButton />
        </View>
        <View style={{ flex: 3, alignItems: "center" }}>
          <StyledText bold size={18}>
            {title}
          </StyledText>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>{right}</View>
      </View>
    </SafeAreaView>
  );
}
