import * as React from "react";
import { View } from "react-native";
import { RectButton, ScrollView, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ItemListItem, { COLORS } from "../components/ItemListItem";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";

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
        {icon && <Icon name={icon} style={{ marginEnd: 5 }} />}
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

const REWARDS = [
  ["percent", "20% on selected items", "Zara", "Details inside"],
  ["grid", "10th ice cream free", "Vaniglia", "6 punches left"],
  ["gift", "Free Chocolate Milk", "Yuda", "Details inside"],
  [
    "clock",
    "Happy Hour until 11PM",
    "ShemTov",
    "Valid until tomorrow!",
    "important"
  ]
];

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
          renderItem={({
            item: [reward, text, store, secondary, secondaryImportant],
            index: i
          }) => (
            <ItemListItem
              onPress={() => {}}
              color={COLORS[i % COLORS.length]}
              logo={store.slice(0, 1)}
              title={store}
              text={text}
              secondaryText={secondary}
              secondaryTextImportant={secondaryImportant}
              sideComponent={<Icon name={reward} size={30} />}
            />
          )}
        />
      </View>
    </View>
  );
}
