import React from "react";
import {
  Container,
  Body,
  Title,
  Left,
  Header,
  Right,
  Text,
  Content,
  Card,
  CardItem
} from "native-base";
import BackButton from "../components/BackButton";

const REWARDS = [
  ["20% off for the next month", "Zara"],
  ["8 punches left", "Vaniglia"],
  ["Umbrella for your next purchase", "Yuda"],
  ["Extended happy hour", "ShemTov"]
];

export default function RewardsScreen() {
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>My Rewards</Title>
        </Body>
        <Right />
      </Header>
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
