import * as React from "react";
import { useContext } from "react";
import { View } from "react-native";
import { SafeAreaView, NavigationContext } from "react-navigation";
import StyledText from "./StyledText";

export default function AppHeader({ sideComponent, bottomComponent }) {
  const { state } = useContext(NavigationContext);
  return (
    <SafeAreaView
      style={{
        paddingBottom: 10,
        backgroundColor: "#FAFAFA",
        borderBottomColor: "#EEE",
        borderBottomWidth: 1
      }}
    >
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <StyledText bold size={30}>
          {state.routeName}
        </StyledText>
        {sideComponent}
      </View>
      {bottomComponent}
    </SafeAreaView>
  );
}
