import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem from "../components/ItemListItem";
import { getExploreListStores } from "../Backend";
import SmallHeader from "../components/SmallHeader";
import StoreLogo from "../components/StoreLogo";
import Container from "../components/Container";

export default function ExploreListScreen() {
  const { getParam, navigate } = useContext(NavigationContext);
  const title = getParam("title");
  const [stores, setStores] = useState([]);
  useEffect(() => {
    getExploreListStores().then(setStores);
  }, []);
  return (
    <Container>
      <SmallHeader title={title} />
      <FlatList
        data={stores}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name, address1, city, logoURL } }) => (
          <ItemListItem
            onPress={() => navigate("Store", { storeId: id })}
            logoComponent={<StoreLogo logoURL={logoURL} size={50} />}
            title={name}
            text={`${address1}, ${city}`}
          />
        )}
      />
    </Container>
  );
}
