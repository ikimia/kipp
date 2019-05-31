import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem from "../components/ItemListItem";
import { getExploreListStores2 } from "../Backend";
import SmallHeader from "../components/SmallHeader";

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
        renderItem={({ item: { id, name, address1, city }, index: i }) => (
          <ItemListItem
            onPress={() => navigate("Store", { storeId: id })}
            logo={name.slice(0, 1)}
            title={name}
            text={`${address1}, ${city}`}
          />
        )}
      />
    </View>
  );
}
