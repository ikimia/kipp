import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import { TouchableHighlight, FlatList } from "react-native-gesture-handler";

const data = [
  ["foodStore", "foodStoreLocation"],
  ["apparelStore", "apparelStoreLocation"],
  ["gasStation", "gasStationLocation"],
  ["ShoesStore", "ShoesStoreLocation"]
];

export default function Stores() {
  const { navigate } = useContext(NavigationContext);
  const { t } = useTranslation("common");
  return (
    <FlatList
      data={data}
      keyExtractor={([name]) => name}
      renderItem={({ item: [name, location] }) => (
        <TouchableHighlight
          style={{ marginBottom: 2 }}
          onPress={() => navigate("PastOrder", { storeName: name })}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderBottomColor: "#EEE",
              borderBottomWidth: 2
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {t(`stores:${name}`)}
                </Text>
                <Text style={{ fontSize: 12 }}>{t(`stores:${location}`)}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    />
  );
}
