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
  {
    name: "McDonald's",
    timeAgo: [3, "hours"],
    location: "Times Square",
    price: "45"
  },
  {
    name: "Macy's",
    timeAgo: [5, "days"],
    location: "100m from Home",
    price: "245"
  },
  { name: "Last month", div: true },
  {
    name: "Walmart",
    timeAgo: [2, "weeks"],
    location: "Valley Stream, NY",
    price: "92"
  },
  {
    name: "Target",
    timeAgo: [1, "month"],
    location: "521 W 25th St, NY",
    price: "142"
  }
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
          {data.map(item =>
            item.div ? (
              <ListItem key={item.name} itemDivider>
                <Text>{item.name}</Text>
              </ListItem>
            ) : (
              <ListItem key={item.name} onPress={() => navigate("PastOrder")}>
                <Body>
                  <AlignedText style={[StyleSheets.textSize3]}>
                    {item.name}
                  </AlignedText>
                  <AlignedText note>{item.location}</AlignedText>
                  <AlignedText note>
                    {m(language)
                      .subtract(...item.timeAgo)
                      .calendar()}
                  </AlignedText>
                </Body>
                <Right style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={[{ paddingRight: 20 }, StyleSheets.textSize3]}>
                    ${item.price}
                  </Text>
                  <ArrowIcon />
                </Right>
              </ListItem>
            )
          )}
        </List>
      </Content>
    </Container>
  );
}
