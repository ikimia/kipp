import * as React from "react";
import { Text, View } from "react-native";
import DarkHeader from "../components/DarkHeader";
import { FlatList, RectButton, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/Feather";

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
        <Text style={{ fontWeight: "600" }}>{title}</Text>
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
      style={{
        padding: 10,
        alignSelf: "stretch"
      }}
    >
      {data.map(({ icon, title }) => (
        <Chip key={title} icon={icon} title={title} />
      ))}
    </ScrollView>
  );
}

function Progress({ value }) {
  return (
    <View style={{ backgroundColor: "#FFF", height: 4, opacity: 0.7 }}>
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
  ["percent", "20% on selected items", "Zara", "11/6"],
  ["grid", "10th ice cream free", "Vaniglia", "28/5", { progress: 0.9 }],
  ["gift", "Free Chocolate Milk", "Yuda", "22/5", { text: "Details inside" }],
  ["clock", "Happy Hour until 11PM", "ShemTov", "tomorrow"]
];

const COLORS = ["#ed5565", "#f8ac59", "#23c6c8", "#1ab394", "#1c84c6"];

export default function RewardsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DarkHeader title="Rewards" />
      <View style={{ borderBottomColor: "#EEE", borderBottomWidth: 1 }}>
        <Chips data={FILTERS} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={REWARDS}
          keyExtractor={([reward]) => reward}
          ListHeaderComponent={() => <View style={{ height: 15 }} />}
          renderItem={({
            item: [reward, description, store, validUntil, extra],
            index
          }) => (
            <RectButton
              style={{
                marginBottom: 1,
                backgroundColor: COLORS[index % COLORS.length],
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  alignSelf: "stretch",
                  justifyContent: "center",
                  paddingHorizontal: 20
                }}
              >
                <Icon name={reward} size={30} color="white" />
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", flex: 1 }}>
                      {store}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        marginTop: 5,
                        opacity: 0.8
                      }}
                    >
                      valid until {validUntil}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14 }}>{description}</Text>
                  {extra && (
                    <View style={{ marginTop: 10 }}>
                      {extra.progress && <Progress value={extra.progress} />}
                      {extra.text && (
                        <Text
                          style={{ fontWeight: "bold", fontStyle: "italic" }}
                        >
                          {extra.text}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </RectButton>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
