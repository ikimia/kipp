import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TextInput, FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { ItemListItem } from "../components/ItemList";

const sections = [
  ["Featured", [["Zara"], ["Zara"], ["Zara"], ["Zara"], ["Zara"]]],
  ["Recently Visited", [["Zara"], ["Zara"], ["Zara"], ["Zara"], ["Zara"]]]
];

const nearbyStores = [
  ["Castro"],
  ["McDonalds"],
  ["Yuda"],
  ["Chop Chop"],
  ["Hamiznon"]
];
const COLORS = [
  "#ff9f43",
  "#ee5253",
  "#5f27cd",
  "#2e86de",
  "#222f3e",
  "#10ac84",
  "#01a3a4",
  "#f368e0"
];

export default function StoresScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: "#FAFAFA",
          borderBottomColor: "#EEE",
          borderBottomWidth: 1
        }}
      >
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                flex: 1
              }}
            >
              Explore
            </Text>
            <Icon name="map" style={{ fontSize: 20 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EEE",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Icon
              name="search"
              style={{ fontSize: 15, color: "#999", marginEnd: 5 }}
            />
            <TextInput placeholder="Search stores" />
          </View>
        </View>
      </SafeAreaView>
      <FlatList
        data={nearbyStores}
        keyExtractor={([storeName]) => storeName}
        ListHeaderComponent={() => (
          <View style={{ paddingTop: 15 }}>
            {sections.map(([name, stores]) => (
              <View style={{ marginBottom: 30 }} key={name}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                    marginStart: 10
                  }}
                >
                  {name}
                </Text>
                <FlatList
                  horizontal
                  ListHeaderComponent={() => <View style={{ width: 5 }} />}
                  data={stores}
                  keyExtractor={(_, i) => `${i}`}
                  renderItem={({ item: [storeName], index: i }) => (
                    <View style={{ marginHorizontal: 5 }}>
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          backgroundColor: COLORS[i % COLORS.length],
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 28,
                            fontWeight: "bold"
                          }}
                        >
                          {storeName.slice(0, 1)}
                        </Text>
                      </View>
                      <Text style={{ marginTop: 5, fontSize: 16 }}>
                        {storeName}
                      </Text>
                      <Text style={{ fontSize: 12 }}>Clothing</Text>
                    </View>
                  )}
                />
              </View>
            ))}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                marginStart: 10
              }}
            >
              Nearby
            </Text>
          </View>
        )}
        renderItem={({ item: [storeName], index: i }) => (
          <ItemListItem
            color={COLORS[COLORS.length - 1 - (i % COLORS.length)]}
            logo={storeName.slice(0, 1)}
            title={storeName}
            text="אחד העם 13, תל אביב"
          />
        )}
      />
    </View>
  );
}
