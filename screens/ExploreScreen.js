import * as React from "react";
import { View } from "react-native";
import {
  TextInput,
  FlatList,
  BorderlessButton
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ItemListItem, { COLORS } from "../components/ItemListItem";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import {
  getCompanyName,
  getCompanyAddress,
  RandomLogo,
  repeat
} from "../FakeData";

const sections = [
  ["Nearby", repeat(3, () => [getCompanyName(), getCompanyAddress()])],
  ["Recently Visited", repeat(3, () => [getCompanyName(), getCompanyAddress()])]
];

const lanes = [
  ["Featured", repeat(5, getCompanyName)],
  ["Offers Memberships", repeat(5, getCompanyName)]
];

const Header = ({ title }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      margin: 10
    }}
  >
    <StyledText bold size={20}>
      {title}
    </StyledText>
    <BorderlessButton activeOpacity={0.5}>
      <StyledText size={16} color="#777">
        see all
      </StyledText>
    </BorderlessButton>
  </View>
);

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        sideComponent={<Icon name="map" style={{ fontSize: 20 }} />}
        bottomComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EEE",
              padding: 10,
              borderRadius: 10,
              marginTop: 5,
              marginHorizontal: 15
            }}
          >
            <Icon
              name="search"
              style={{ fontSize: 15, color: "#999", marginEnd: 5 }}
            />
            <TextInput placeholder="Search stores" />
          </View>
        }
      />
      <FlatList
        data={sections}
        keyExtractor={([storeName]) => storeName}
        ListHeaderComponent={() => (
          <View style={{ paddingTop: 10 }}>
            {lanes.map(([title, stores]) => (
              <View key={title}>
                <Header title={title} />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() => <View style={{ width: 5 }} />}
                  data={stores}
                  keyExtractor={(_, i) => `${i}`}
                  renderItem={({ item: storeName }) => (
                    <View style={{ marginHorizontal: 6, width: 120 }}>
                      <RandomLogo />
                      <StyledText size={14} bold style={{ marginTop: 5 }}>
                        {storeName}
                      </StyledText>
                      <StyledText size={10}>Clothing</StyledText>
                    </View>
                  )}
                />
              </View>
            ))}
          </View>
        )}
        renderItem={({ item: [sectionName, stores], index: i }) => (
          <View>
            <Header title={sectionName} />
            {stores.map(([storeName, storeLocation], j) => (
              <ItemListItem
                key={j}
                color={COLORS[(j + 1 + i * stores.length) % COLORS.length]}
                logo={storeName.slice(0, 1)}
                title={storeName}
                text={storeLocation}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
}
