import React, { useContext } from "react";
import { View } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem, { COLORS } from "./ItemListItem";
import StyledText from "./StyledText";

const data = [
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"],
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"],
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"],
  ["foodStore", [3, "hours"], "foodStoreLocation", "45"],
  ["apparelStore", [5, "days"], "apparelStoreLocation", "211"],
  ["gasStation", [2, "weeks"], "gasStationLocation", "92"],
  ["ShoesStore", [1, "month"], "ShoesStoreLocation", "142"],
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
      keyExtractor={(_, i) => `${i}`}
      renderItem={({ item: [storeName, timeAgo, , amount], index: i }) => (
        <ItemListItem
          onPress={() => navigate("PastOrder", { storeName })}
          color={COLORS[i % COLORS.length]}
          logo={t(`stores:${storeName}`).slice(0, 1)}
          title={t(`stores:${storeName}`)}
          text={m(language)
            .subtract(...timeAgo)
            .calendar()}
          sideComponent={
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <StyledText size={16} color="#666" style={{ marginEnd: 2 }}>
                {t("common:currencySign")}
              </StyledText>
              <StyledText size={20} bold>
                {amount}
              </StyledText>
            </View>
          }
        />
      )}
    />
  );
}
