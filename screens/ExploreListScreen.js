import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem from "../components/ItemListItem";
import { getExploreListStores2 } from "../Backend";
import SmallHeader from "../components/SmallHeader";
import StoreLogo from "../components/StoreLogo";

export default function ExploreListScreen() {
  const { getParam, navigate } = useContext(NavigationContext);
  const title = getParam("title");
  const [stores, setStores] = useState([]);
  useEffect(() => {
    getExploreListStores2().then(setStores);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <SmallHeader title={title} />
      <FlatList
        data={stores}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name, address1, city, logoURL } }) => (
          <ItemListItem
            onPress={() => navigate("Store", { storeId: id })}
            logoComponent={<StoreLogo storeName={name} logoURL={logoURL} />}
            title={name}
            text={`${address1}, ${city}`}
          />
        )}
      />
    </View>
  );
}
