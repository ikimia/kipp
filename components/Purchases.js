import React, { useContext, useEffect, useState } from "react";
import { View, RefreshControl } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import { FlatList } from "react-native-gesture-handler";
import ItemListItem, { COLORS } from "./ItemListItem";
import StyledText from "./StyledText";
import { getReceipts } from "../Backend";

const m = (language, created) => {
  const localizedMoment = moment(created);
  localizedMoment.locale(language);
  return localizedMoment;
};

export default function Purchases() {
  const { navigate } = useContext(NavigationContext);
  const { t, i18n } = useTranslation("common");
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = () => getReceipts().then(setData);
  const { language } = i18n;
  useEffect(() => {
    refreshData();
  }, []);
  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl
          onRefresh={async () => {
            setRefreshing(true);
            await refreshData();
            setRefreshing(false);
          }}
          refreshing={refreshing}
        />
      }
      keyExtractor={(_, i) => `${i}`}
      renderItem={({ item: { storeName, price, created }, index: i }) => (
        <ItemListItem
          onPress={() => navigate("PastOrder", { storeName })}
          color={COLORS[i % COLORS.length]}
          logo={storeName.slice(0, 1)}
          title={storeName}
          text={m(language, created).calendar()}
          sideComponent={
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <StyledText size={16} color="#666" style={{ marginEnd: 2 }}>
                {t("common:currencySign")}
              </StyledText>
              <StyledText size={20} bold>
                {price}
              </StyledText>
            </View>
          }
        />
      )}
    />
  );
}
