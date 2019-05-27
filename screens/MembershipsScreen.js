import * as React from "react";
import { View } from "react-native";
import {
  RectButton,
  ScrollView,
  FlatList,
  BorderlessButton
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import { RandomLogo, getCompanyName, repeat } from "../FakeData";

function Chip({ title, icon }) {
  return (
    <RectButton
      style={{
        backgroundColor: "#EEE",
        marginEnd: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 13
      }}
    >
      <View
        style={{ opacity: 0.6, flexDirection: "row", alignItems: "center" }}
      >
        {<Icon name={icon} style={{ marginEnd: 5 }} />}
        <StyledText>{title}</StyledText>
      </View>
    </RectButton>
  );
}

function Chips({ data }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ alignSelf: "stretch", paddingHorizontal: 10 }}
    >
      {data.map(({ icon, title }) => (
        <Chip key={title} icon={icon} title={title} />
      ))}
    </ScrollView>
  );
}

const FILTERS = [
  { icon: "sun", title: "Still Valid" },
  { icon: "sunset", title: "Expired" },
  { icon: "navigation", title: "Near Me" },
  { icon: "clock", title: "Relevant Now" }
];

const REWARDS = repeat(6, getCompanyName);

export default function MembershipsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        bottomComponent={
          <View style={{ paddingTop: 10 }}>
            <Chips data={FILTERS} />
          </View>
        }
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={REWARDS}
          keyExtractor={(_, i) => `${i}`}
          renderItem={({ item: store }) => (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  marginBottom: 25,
                  borderRadius: 3,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6
                  },
                  shadowOpacity: 0.37,
                  shadowRadius: 7.49,

                  elevation: 12
                }}
              >
                <BorderlessButton activeOpacity={0.5}>
                  <RandomLogo height={180} width={350} text={store} />
                </BorderlessButton>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
