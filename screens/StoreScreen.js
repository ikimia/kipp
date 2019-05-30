import React from "react";
import { View, Image } from "react-native";
import SmallHeader from "../components/SmallHeader";
import StyledText from "../components/StyledText";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";
import { COLORS } from "../components/ItemListItem";

const about = [
  ["Phone Number", "054-6811459", "phone"],
  ["Email", "contact@zara.co.il", "mail"],
  ["Website", "www.zara.co.il", "globe"]
];

const features = [
  "10% off for the first month",
  "Birthday gift",
  "Punch card",
  "And much more"
];

function Section({ title, children, marginBottom = 10 }) {
  return (
    <View style={{ padding: 10, marginBottom }}>
      <View style={{ paddingBottom: 10 }}>
        <StyledText bold size={18}>
          {title}
        </StyledText>
      </View>
      {children}
    </View>
  );
}

export default function StoreScreen() {
  const title = "Zara";
  return (
    <View style={{ flex: 1 }}>
      <SmallHeader title={title} />
      <ScrollView>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 10,
            flexDirection: "row"
          }}
        >
          <Image
            source={require("../assets/img/zaralogo.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: "#EEE",
              borderWidth: 1
            }}
          />
          <View style={{ paddingStart: 15 }}>
            <StyledText bold size={22}>
              {title}
            </StyledText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "lightgreen",
                  marginEnd: 5
                }}
              />
              <StyledText>Open today until 23:00</StyledText>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFA",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#EEE",
            paddingHorizontal: 5,
            marginBottom: 20
          }}
        >
          <Section title="Membership" marginBottom={0}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {features.map(text => (
                  <View key={text}>
                    <StyledText>• {text}</StyledText>
                  </View>
                ))}
              </View>
              <View>
                <BorderlessButton>
                  <StyledText bold color={COLORS[5]}>
                    JOIN NOW
                  </StyledText>
                </BorderlessButton>
              </View>
            </View>
          </Section>
        </View>
        <Section title="Location">
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <StyledText>Harakevet 15</StyledText>
              <StyledText>Tel Aviv</StyledText>
              <StyledText>Israel</StyledText>
            </View>
            <View>
              <BorderlessButton>
                <StyledText color={COLORS[5]}>Map</StyledText>
              </BorderlessButton>
            </View>
          </View>
        </Section>
        <Section title="Contact">
          <View>
            {about.map(([key, value, icon]) => (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <View style={{ marginHorizontal: 10 }}>
                  <Icon name={icon} size={20} />
                </View>
                <View
                  style={{
                    flex: 1,
                    paddingStart: 5,
                    paddingVertical: 15,
                    borderBottomColor: "#EEE",
                    borderBottomWidth: 1
                  }}
                >
                  <StyledText size={16}>{value}</StyledText>
                </View>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </View>
  );
}
