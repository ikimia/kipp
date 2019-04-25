import React, { useContext } from "react";
import moment from "moment";
import { Card, CardItem, View, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";

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
    <View>
      {data.map(([name, timeAgo, location, amount]) => (
        <Card key={name}>
          <CardItem
            style={{ alignItems: "flex-start" }}
            button
            onPress={() => navigate("PastOrder", { storeName: name })}
          >
            <View style={{ flex: 1 }}>
              <Text note>
                {m(language)
                  .subtract(...timeAgo)
                  .calendar()}
              </Text>
              <View>
                <Text style={{ fontSize: 20 }}>{t(`stores:${name}`)}</Text>
                <Text style={{ fontSize: 12 }}>{t(`stores:${location}`)}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 20 }}>
              {t("common:currencySign")}
              {amount}
            </Text>
          </CardItem>
        </Card>
      ))}
    </View>
  );
}
