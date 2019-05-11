import React from "react";
import { Text, View } from "react-native";
import DarkHeader from "../components/DarkHeader";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";

const REWARDS = [
  ["20% off for the next month", "Zara"],
  ["8 punches left", "Vaniglia"],
  ["Umbrella for your next purchase", "Yuda"],
  ["Extended happy hour", "ShemTov"]
];

export default function RewardsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DarkHeader title="REWARDS" back />
      <FlatList
        data={REWARDS}
        keyExtractor={([reward]) => reward}
        renderItem={({ item: [reward, store] }) => (
          <TouchableHighlight style={{ marginBottom: 2 }} onPress={() => {}}>
            <View
              style={{
                backgroundColor: "white",
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: "#EEE",
                borderBottomWidth: 2
              }}
            >
              <View>
                <Text>
                  {reward} at{" "}
                  <Text style={{ fontWeight: "bold" }}>{store}</Text>
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </SafeAreaView>
  );
}
