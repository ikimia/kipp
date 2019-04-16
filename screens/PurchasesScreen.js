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

const data = [
  {
    name: "McDonald's",
    date: "4 days ago",
    location: "Times Square",
    price: "45"
  },
  {
    name: "Macy's",
    date: "7 days ago",
    location: "100m from Home",
    price: "245"
  },
  { name: "Last month", div: true },
  {
    name: "Walmart",
    date: "22/03/2019",
    location: "Valley Stream, NY",
    price: "92"
  },
  {
    name: "Target",
    date: "13/03/2019",
    location: "521 W 25th St, NY",
    price: "142"
  }
];

export default function PurchasesScreen({ navigation: { navigate } }) {
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
                  <AlignedText note>
                    {item.date} | {item.location}
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
