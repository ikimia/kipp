import React, { useContext } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Text
} from "native-base";
import StyleSheets from "../constants/StyleSheets";
import ArrowIcon from "../components/ArrowIcon";
import AlignedText from "../components/AlignedText";

import moment from "moment";
import "moment/locale/he";
import { useTranslation } from "react-i18next";
import { NavigationContext } from "react-navigation";
import DarkHeader from "../components/DarkHeader";

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

export default function PurchasesScreen() {
  const { navigate } = useContext(NavigationContext);
  const { t, i18n } = useTranslation("stores");
  const { language } = i18n;
  return (
    <Container>
      <DarkHeader title={t("purchases:purchases")} />
      <Content>
        <List>
          {data.map(([name, timeAgo, location, price]) => (
            <ListItem
              key={name}
              onPress={() => navigate("PastOrder", { storeName: name })}
            >
              <Body>
                <AlignedText style={[StyleSheets.textSize3]}>
                  {t(name)}
                </AlignedText>
                <AlignedText note>{t(location)}</AlignedText>
                <AlignedText note>
                  {m(language)
                    .subtract(...timeAgo)
                    .calendar()}
                </AlignedText>
              </Body>
              <Right style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[{ paddingRight: 20 }, StyleSheets.textSize3]}>
                  {t("common:currencySign")}
                  {price}
                </Text>
                <ArrowIcon />
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
}
