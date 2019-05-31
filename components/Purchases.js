import React, { useContext, useEffect, useState } from "react";
import { View, RefreshControl, SectionList } from "react-native";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import ItemListItem from "./ItemListItem";
import StyledText from "./StyledText";
import { getReceipts } from "../Backend";
import groupBy from "lodash/groupBy";
import ItemListSectionHeader from "./ItemListSectionHeader";

const createSections = (() => {
  const startOf = unitOfTime =>
    moment()
      .startOf(unitOfTime)
      .valueOf();
  const TODAY_LABEL = "Today";
  const WEEK_LABEL = "This Week";
  const MONTH_LABEL = "This Month";
  const PAST_LABEL = "Past Purchases";
  return receipts => {
    const startOfDay = startOf("day");
    const startOfWeek = startOf("week");
    const startOfMonth = startOf("month");
    const groups = groupBy(
      receipts,
      receipt =>
        [TODAY_LABEL, WEEK_LABEL, MONTH_LABEL][
          [startOfDay, startOfWeek, startOfMonth].findIndex(
            time => receipt.created > time
          )
        ] || PAST_LABEL
    );
    const sections = [TODAY_LABEL, WEEK_LABEL, MONTH_LABEL, PAST_LABEL]
      .filter(key => groups[key])
      .map(key => ({ title: key, data: groups[key] }));
    return sections;
  };
})();

const m = (language, created) => {
  const localizedMoment = moment(created);
  localizedMoment.locale(language);
  return localizedMoment;
};

export default function Purchases() {
  const { navigate } = useContext(NavigationContext);
  const { t, i18n } = useTranslation("common");
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const refreshData = () => {
    getReceipts()
      .then(createSections)
      .then(setSections);
  };
  const { language } = i18n;
  useEffect(() => {
    refreshData();
  }, []);
  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section: { title } }) => (
        <ItemListSectionHeader title={title} />
      )}
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
      keyExtractor={({ id }) => id}
      renderItem={({ item: { id, storeName, price, created }, index: i }) => (
        <ItemListItem
          onPress={() => navigate("PastOrder", { receiptId: id })}
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
