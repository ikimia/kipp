import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem, { COLORS } from "../components/ItemListItem";
import { getExploreListStores } from "../Backend";
import SmallHeader from "../components/SmallHeader";

export default function ExploreListScreen() {
  const navigation = useContext(NavigationContext);
  const title = navigation.getParam("title");
  const [stores, setStores] = useState([]);
  useEffect(() => {
    (async function() {
      setStores(await getExploreListStores());
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <SmallHeader title={title} />
      <FlatList
        data={stores}
        keyExtractor={x => x[0]}
        renderItem={({ item: [storeName, storeLocation], index: i }) => (
          <ItemListItem
            color={COLORS[i % COLORS.length]}
            logo={storeName.slice(0, 1)}
            title={storeName}
            text={storeLocation}
          />
        )}
      />
    </View>
  );
}
