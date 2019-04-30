import React from "react";
import { Container, Text, Content, View } from "native-base";
import DarkHeader from "../components/DarkHeader";
import { OFFWHITE } from "../constants/Colors";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

const REWARDS = [
  ["20% off for the next month", "Zara"],
  ["8 punches left", "Vaniglia"],
  ["Umbrella for your next purchase", "Yuda"],
  ["Extended happy hour", "ShemTov"]
];

export default function RewardsScreen() {
  return (
    <Container>
      <DarkHeader title="REWARDS" />
      <Content style={{ backgroundColor: OFFWHITE }}>
        <FlatList
          data={REWARDS}
          keyExtractor={([reward]) => reward}
          renderItem={({ item: [reward, store] }) => (
            <TouchableHighlight style={{ marginBottom: 2 }} onPress={() => {}}>
              <View
                style={{
                  backgroundColor: "white",
                  paddingVertical: 15,
                  paddingHorizontal: 20
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
      </Content>
    </Container>
  );
}
