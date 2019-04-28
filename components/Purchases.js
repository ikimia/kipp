import React, { useContext } from "react";
import moment from "moment";
import { View, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import { TouchableHighlight, FlatList } from "react-native-gesture-handler";

const data = [
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"]
];

const m = language => {
  const localizedMoment = moment();
  localizedMoment.locale(language);
  return localizedMoment;
};

export default function Purchases() {
  const { navigate } = useContext(NavigationContext);
  const { t, i18n } = useTranslation("common");
  const { language } = i18n;
  return (
    <FlatList
      data={data}
      keyExtractor={([name]) => name}
      renderItem={({ item: [name, timeAgo, location, amount] }) => (
        <TouchableHighlight
          style={{ marginBottom: 2 }}
          onPress={() => navigate("PastOrder", { storeName: name })}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 15
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
                <Text style={{ fontSize: 12, color: "#666" }}>
                  {m(language)
                    .subtract(...timeAgo)
                    .calendar()}
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>
                {t("common:currencySign")}
                {amount}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      )}
    />
  );
}
