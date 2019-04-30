import React from "react";
import { Container, Text, Content, Card, CardItem } from "native-base";
import DarkHeader from "../components/DarkHeader";

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
      <Content style={{ backgroundColor: "#F4F4F4" }}>
        {REWARDS.map(([reward, store], i) => (
          <Card key={i}>
            <CardItem>
              <Text>
                {reward} at <Text style={{ fontWeight: "bold" }}>{store}</Text>
              </Text>
            </CardItem>
          </Card>
        ))}
      </Content>
    </Container>
  );
}
