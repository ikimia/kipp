import * as React from "react";
import { useState, useEffect } from "react";
import { View } from "react-native";
import {
  RectButton,
  ScrollView,
  FlatList,
  TextInput,
  BorderlessButton
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StyledText from "../components/StyledText";
import AppHeader from "../components/AppHeader";
import Container from "../components/Container";
import ItemListItem from "../components/ItemListItem";

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
      text: "Get a free burger",
      starred: true
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

function Star({ selected }) {
  const [name, color] = selected ? ["star", "gold"] : ["star-o", "#666"];
  return <FontAwesome name={name} color={color} size={20} />;
}

function OfferListItem({ offer }) {
  const [starred, setStarred] = useState(!!offer.starred);
  return (
    <ItemListItem
      logo={offer.storeName[0]}
      title={offer.text}
      secondaryTitle={offer.storeName}
      sideComponent={
        <View style={{ paddingStart: 10 }}>
          <BorderlessButton
            onPress={() => {
              setStarred(v => !v);
            }}
          >
            <Star selected={starred} />
          </BorderlessButton>
        </View>
      }
    />
  );
}

export default function OffersScreen() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    getOffers().then(setOffers);
  }, []);

  return (
    <Container>
      <AppHeader bottomComponent={<SearchInput />} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={offers}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: offer }) => <OfferListItem offer={offer} />}
        />
      </View>
    </Container>
  );
}
