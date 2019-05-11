import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import BackButton from "../components/BackButton";
import {
  TextInput,
  RectButton,
  ScrollView
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import CategoryIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Stores from "../components/Stores";

function Chip({ title }) {
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
      <View style={{ opacity: 0.6 }}>
        <Text style={{ fontWeight: "600" }}>{title}</Text>
      </View>
    </RectButton>
  );
}

function CategoryButton({ icon, title }) {
  return (
    <View style={{ alignItems: "center", width: 80, marginEnd: 5 }}>
      <RectButton
        style={{
          backgroundColor: "#00CDCD",
          height: 50,
          width: 50,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 5
        }}
      >
        <View style={{ opacity: 0.6 }}>
          <CategoryIcon name={icon} style={{ fontSize: 26 }} />
        </View>
      </RectButton>
      <Text>{title}</Text>
    </View>
  );
}

export default function StoresScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomColor: "#EEE",
            borderBottomWidth: 1
          }}
        >
          <BackButton />
          <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 5 }}>
            Stores
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EEE",
              padding: 10,
              borderRadius: 10
            }}
          >
            <Icon
              name="chevrons-down"
              style={{ fontSize: 15, color: "#999", marginEnd: 5 }}
            />
            <TextInput placeholder="Filter by store name" />
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          paddingVertical: 10,
          borderBottomColor: "#EEE",
          borderBottomWidth: 1,
          flexDirection: "row"
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ width: 15 }} />
          <Chip title="Rewards" />
          <Chip title="Offers" />
          <Chip title="Been Before" />
        </ScrollView>
      </View>
      <View
        style={{
          paddingVertical: 10,
          borderBottomColor: "#EEE",
          borderBottomWidth: 1,
          flexDirection: "row"
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ width: 15 }} />
          <CategoryButton icon="store" title="Retail" />
          <CategoryButton icon="cart" title="Groceries" />
          <CategoryButton icon="food" title="Restaurants" />
          <CategoryButton icon="coffee" title="Cafe" />
          <CategoryButton icon="glass-cocktail" title="Nightlife" />
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <Stores />
      </View>
    </View>
  );
}
