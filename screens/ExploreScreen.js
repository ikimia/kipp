import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import {
  TextInput,
  FlatList,
  BorderlessButton,
  RectButton,
  ScrollView
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import ItemListItem, { COLORS } from "../components/ItemListItem";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import { RandomLogo } from "../FakeData";
import { getExploreData2 } from "../Backend";
import { NavigationContext } from "react-navigation";

const Header = ({ title }) => {
  const { navigate } = useContext(NavigationContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 10
      }}
    >
      <StyledText bold size={20}>
        {title}
      </StyledText>
      <BorderlessButton
        activeOpacity={0.5}
        onPress={() => navigate("ExploreList", { title })}
      >
        <StyledText size={16} color="#777">
          see all
        </StyledText>
      </BorderlessButton>
    </View>
  );
};

function StoreSearch() {
  return (
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
  );
}

function StoresLane({ title, stores = [], onStorePress }) {
  return (
    <View>
      <Header title={title} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ width: 5 }} />}
        data={stores}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id: storeId, name: storeName, category } }) => (
          <View style={{ marginHorizontal: 6, width: 120 }}>
            <RectButton onPress={() => onStorePress(storeId)}>
              <RandomLogo seed={storeName} />
              <StyledText size={14} bold style={{ marginTop: 5 }}>
                {storeName}
              </StyledText>
              <StyledText size={10}>{category}</StyledText>
            </RectButton>
          </View>
        )}
      />
    </View>
  );
}

function StoresSection({ title, stores = [], onStorePress }) {
  return (
    <View>
      <Header title={title} />
      {stores.map(({ id: storeId, name: storeName, address1, city }, i) => (
        <ItemListItem
          key={storeId}
          onPress={() => onStorePress(storeId)}
          color={COLORS[i % COLORS.length]}
          logo={storeName.slice(0, 1)}
          title={storeName}
          text={`${address1}, ${city}`}
        />
      ))}
    </View>
  );
}

export default function ExploreScreen() {
  const { navigate } = useContext(NavigationContext);
  const [data, setData] = useState({});
  useEffect(() => {
    getExploreData2().then(setData);
  }, []);
  const navigateToStore = storeId => navigate("Store", { storeId });
  return (
    <View style={{ flex: 1 }}>
      <AppHeader bottomComponent={<StoreSearch />} />
      <ScrollView style={{ flex: 1 }}>
        <StoresLane
          title="Featured"
          stores={data.featured}
          onStorePress={navigateToStore}
        />
        <StoresLane
          title="Offers Membership"
          stores={data.offersMembership}
          onStorePress={navigateToStore}
        />
        <StoresSection
          title="Recently Visited"
          stores={data.recentlyVisited}
          onStorePress={navigateToStore}
        />
        <StoresSection
          title="Nearby"
          stores={data.nearby}
          onStorePress={navigateToStore}
        />
      </ScrollView>
    </View>
  );
}
