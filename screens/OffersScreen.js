import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image } from "react-native";
import {
  RectButton,
  ScrollView,
  FlatList,
  TextInput
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import Container from "../components/Container";
import StoreLogo from "../components/StoreLogo";

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
        {<Icon name={icon} style={{ marginEnd: 5 }} />}
        <StyledText>{title}</StyledText>
      </View>
    </RectButton>
  );
}

function Chips({ data }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ alignSelf: "stretch", paddingHorizontal: 10 }}
    >
      {data.map(({ icon, title }) => (
        <Chip key={title} icon={icon} title={title} />
      ))}
    </ScrollView>
  );
}

const FILTERS = [
  { icon: "bookmark", title: "Saved" },
  { icon: "navigation", title: "Near Me" },
  { icon: "navigation", title: "Near Me" }
];

function SearchInput() {
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
      <TextInput placeholder="Search offers" />
    </View>
  );
}

async function getOffers() {
  return [
    {
      id: "12312",
      storeName: "McDonalds",
      address: "Ibn Gabirol St 92",
      text: "Get a beach towel with this coupon"
    },
    {
      id: "2222",
      storeName: "Burger King",
      address: "Ibn Gabirol St 92",
      text: "Get a free burger"
    },
    {
      id: "333",
      storeName: "Otello",
      address: "Dizengoff St 151",
      text: "Get free ice scream"
    },
    {
      id: "444",
      storeName: "Arcaffe",
      address: "Ibn Gabirol St 100",
      text: "Free coffee with every sandwich"
    }
  ];
}

export default function OffersScreen() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getOffers().then(setOffers);
  }, []);

  return (
    <Container>
      <AppHeader bottomComponent={<SearchInput />} />
      <View style={{ flex: 1, backgroundColor: "#EEE" }}>
        <FlatList
          data={offers}
          keyExtractor={({ id }) => id}
          style={{ paddingVertical: 10 }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: offer }) => (
            <View style={{ backgroundColor: "white" }}>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <StoreLogo storeName={offer.storeName} size={50} />
                  <View style={{ marginStart: 10 }}>
                    <View>
                      <StyledText bold size={16}>
                        {offer.storeName}
                      </StyledText>
                      <StyledText color="#666" size={12}>
                        {offer.address}
                      </StyledText>
                    </View>
                  </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <StyledText>{offer.text}</StyledText>
                </View>
              </View>
              {offer.attachment && (
                <View>
                  <Image
                    source={offer.attachment}
                    style={{ height: 200, width: "100%" }}
                  />
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderTopColor: "#CCC"
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10
                  }}
                >
                  <Icon name="plus-square" style={{ marginEnd: 5 }} size={14} />
                  <StyledText bold>Use</StyledText>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10
                  }}
                >
                  <Icon name="share" style={{ marginEnd: 5 }} size={14} />
                  <StyledText bold>Share</StyledText>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
}
