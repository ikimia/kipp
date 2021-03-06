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
import { getExploreData } from "../Backend";
import { NavigationContext } from "react-navigation";
import StoreLogo from "../components/StoreLogo";
import Container from "../components/Container";
import SearchInput from "../components/SearchInput";

const Header = ({ title }) => {
  const { navigate } = useContext(NavigationContext);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        marginTop: 0
      }}
    >
      <StyledText bold size={20}>
        {title}
      </StyledText>
      <BorderlessButton
        style={{ marginEnd: 5 }}
        activeOpacity={0.5}
        onPress={() => navigate("ExploreList", { title })}
      >
        <StyledText size={14} color={COLORS[3]}>
          See All
        </StyledText>
      </BorderlessButton>
    </View>
  );
};

function StoresLane({ title, stores = [], onStorePress }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <Header title={title} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{ width: 5 }} />}
        data={stores}
        keyExtractor={({ id }) => id}
        renderItem={({
          item: { id: storeId, name: storeName, category, logoURL }
        }) => (
          <View style={{ marginHorizontal: 6, width: 120 }}>
            <RectButton onPress={() => onStorePress(storeId)}>
              <StoreLogo logoURL={logoURL} />
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
    <View style={{ marginVertical: 20 }}>
      <Header title={title} />
      {stores.map(
        ({ id: storeId, name: storeName, address1, city, logoURL }, i) => (
          <ItemListItem
            key={storeId}
            onPress={() => onStorePress(storeId)}
            logoComponent={<StoreLogo logoURL={logoURL} size={50} />}
            title={storeName}
            text={`${address1}, ${city}`}
            last={i === stores.length - 1}
          />
        )
      )}
    </View>
  );
}

function Separator() {
  return (
    <View
      style={{
        borderTopColor: "#EEE",
        borderTopWidth: 1,
        marginHorizontal: 10
      }}
    />
  );
}

export default function ExploreScreen() {
  const { navigate } = useContext(NavigationContext);
  const [data, setData] = useState({});
  useEffect(() => {
    getExploreData().then(setData);
  }, []);
  const navigateToStore = storeId => navigate("Store", { storeId });
  return (
    <Container>
      <AppHeader bottomComponent={<SearchInput />} />
      <ScrollView style={{ flex: 1 }}>
        <StoresLane
          title="Featured"
          stores={data.featured}
          onStorePress={navigateToStore}
        />
        <Separator />
        <StoresSection
          title="Recently Visited"
          stores={data.recentlyVisited}
          onStorePress={navigateToStore}
        />
        <Separator />
        <StoresSection
          title="Nearby"
          stores={data.nearby}
          onStorePress={navigateToStore}
        />
      </ScrollView>
    </Container>
  );
}
