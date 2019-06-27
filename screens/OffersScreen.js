import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { FlatList, BorderlessButton } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppHeader from "../components/AppHeader";
import Container from "../components/Container";
import ItemListItem from "../components/ItemListItem";
import StyledText from "../components/StyledText";
import { getOffers } from "../Backend";
import { NavigationContext } from "react-navigation";
import StoreLogo from "../components/StoreLogo";
import SearchInput from "../components/SearchInput";

function Badge({ size = 20, number = 1 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        marginEnd: size / 2,
        backgroundColor: "darkred",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          position: "absolute",
          right: -Math.sqrt((size / 2) ** 2 + (size / 2) ** 2) / 2 + size / 4,
          width: size / 2,
          height: size / 2,
          backgroundColor: "darkred",
          transform: [{ rotate: "45deg" }]
        }}
      />
      <StyledText size={size / 1.5} bold color="white">
        {number}
      </StyledText>
    </View>
  );
}

function Star({ selected }) {
  const [name, color] = selected ? ["star", "gold"] : ["star-o", "#666"];
  return <FontAwesome name={name} color={color} size={20} />;
}

function OfferListItem({ offer, onStar }) {
  const { navigate } = useContext(NavigationContext);
  return (
    <ItemListItem
      logoComponent={<StoreLogo size={50} logoURL={offer.store.logoURL} />}
      title={offer.text}
      secondaryTitle={offer.store.name}
      onPress={() => navigate("Offer", { offerId: offer.id })}
      sideComponent={
        <BorderlessButton
          onPress={onStar}
          style={{ justifyContent: "center", padding: 15 }}
        >
          <Star selected={offer.starred} />
        </BorderlessButton>
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
      <AppHeader
        sideComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Badge number={offers.reduce((n, o) => n + (o.starred || 0), 0)} />
            <FontAwesome name="star-o" size={22} />
          </View>
        }
        bottomComponent={<SearchInput />}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={offers}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: offer, index }) => (
            <OfferListItem
              offer={offer}
              onStar={() =>
                setOffers(offers =>
                  offers.map((o, i) =>
                    i === index ? Object.assign(o, { starred: !o.starred }) : o
                  )
                )
              }
            />
          )}
        />
      </View>
    </Container>
  );
}
