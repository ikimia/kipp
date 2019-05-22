import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TextInput, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ItemListItem, { COLORS } from "../components/ItemListItem";
import StyledText from "../components/StyledText";

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
            <View style={{ flex: 1 }}>
              <StyledText bold size={30}>
                Explore
              </StyledText>
            </View>
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
                <StyledText
                  bold
                  size={20}
                  style={{
                    marginBottom: 10,
                    marginStart: 10
                  }}
                >
                  {name}
                </StyledText>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
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
                        <StyledText color="white" size={28} bold>
                          {storeName.slice(0, 1)}
                        </StyledText>
                      </View>
                      <StyledText size={16} style={{ marginTop: 5 }}>
                        {storeName}
                      </StyledText>
                      <StyledText size={12}>Clothing</StyledText>
                    </View>
                  )}
                />
              </View>
            ))}
            <StyledText
              bold
              size={20}
              style={{
                marginBottom: 10,
                marginStart: 10
              }}
            >
              Nearby
            </StyledText>
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
