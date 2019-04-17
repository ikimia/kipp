import React from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Text,
  Header,
  Left,
  Title
} from "native-base";
import StyleSheets from "../constants/StyleSheets";
import ArrowIcon from "../components/ArrowIcon";
import AlignedText from "../components/AlignedText";

import moment from "moment";
import "moment/locale/he";
import { useTranslation } from "react-i18next";

const data = [
  ["McDonald's", [3, "hours"], "Times Square", "45"],
  ["Macy's", [5, "days"], "100m from Home", "245"],
  ["Walmart", [2, "weeks"], "Valley Stream, NY", "92"],
  ["Target", [1, "month"], "521 W 25th St, NY", "142"]
];

const m = language => {
  const localizedMoment = moment();
  localizedMoment.locale(language);
  return localizedMoment;
};

export default function PurchasesScreen({ navigation: { navigate } }) {
  const {
    i18n: { language }
  } = useTranslation();
  return (
    <Container style={StyleSheets.container}>
      <Header>
        <Left />
        <Body>
          <Title>Purchases</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          {data.map(([name, timeAgo, location, price]) => (
            <ListItem key={name} onPress={() => navigate("PastOrder")}>
              <Body>
                <AlignedText style={[StyleSheets.textSize3]}>
                  {name}
                </AlignedText>
                <AlignedText note>{location}</AlignedText>
                <AlignedText note>
                  {m(language)
                    .subtract(...timeAgo)
                    .calendar()}
                </AlignedText>
              </Body>
              <Right style={{ display: "flex", flexDirection: "row" }}>
                <Text style={[{ paddingRight: 20 }, StyleSheets.textSize3]}>
                  ${price}
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
