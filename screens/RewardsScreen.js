import * as React from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";
import DarkHeader from "../components/DarkHeader";
import { FlatList, RectButton, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import ItemList from "../components/ItemList";

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
        <Text style={styles.text}>{title}</Text>
      </View>
    </RectButton>
  );
}

function SwitchChip({ value, onValueChange, title }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <RectButton
        style={{
          backgroundColor: value ? "#49beb7" : "#999",
          marginEnd: 5,
          borderRadius: 13,
          height: 26,
          width: 50
        }}
        onPress={() => onValueChange(!value)}
      >
        <View
          style={{
            height: 22,
            width: 22,
            margin: 2,
            borderRadius: 11,
            backgroundColor: "white",
            alignSelf: value ? "flex-end" : "flex-start"
          }}
        />
      </RectButton>
      <Text style={{ marginStart: 5 }}>{title}</Text>
    </View>
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

function Progress({ value }) {
  return (
    <View
      style={{
        backgroundColor: "#999",
        height: 4,
        marginTop: 10
      }}
    >
      <View
        style={{
          backgroundColor: "#000",
          height: "100%",
          width: `${100 * value}%`
        }}
      />
    </View>
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

export default function RewardsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          paddingBottom: 10,
          backgroundColor: "#FAFAFA",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View>
          <Text
            style={[
              styles.boldText,
              {
                marginVertical: 10,
                marginHorizontal: 15,
                fontSize: 30
              }
            ]}
          >
            Rewards
          </Text>
        </View>
        <Chips data={FILTERS} />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <ItemList
          items={REWARDS}
          data={REWARDS}
          getItemTitle={([, , store]) => store}
          getItemText={([, text]) => text}
          getItemSecondaryText={([, , , text]) => text}
          getItemSecondaryTextImportant={([, , , , important]) => important}
          getSideText={([reward]) => <Icon name={reward} size={30} />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans"
  },
  boldText: {
    fontFamily: "Open Sans",
    fontWeight: "bold"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
});
