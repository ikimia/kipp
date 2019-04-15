import React from "react";
import {
  Container,
  Header,
  Left,
  Title,
  Right,
  Body,
  Content,
  List,
  ListItem,
  Text,
  Icon
} from "native-base";
import { withNamespaces } from "react-i18next";

const ITEMS = [
  ["myAccount"],
  ["paymentSettings"],
  ["language", ({ t, i18n }) => t(i18n.language), "LanguageSettings"]
];

class SettingsScreen extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{t("settings")}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#f4f4f4" }}>
          <List>
            <ListItem itemDivider />
            {ITEMS.map(([item, right, screen], i) => (
              <ListItem
                key={item}
                noIndent
                icon
                style={{ backgroundColor: "white" }}
                first={i === 0}
                last={i === ITEMS.length - 1}
                onPress={
                  screen && (() => this.props.navigation.navigate(screen))
                }
              >
                <Body>
                  <Text>{t(item)}</Text>
                </Body>
                <Right>
                  {right && <Text>{right(this.props)}</Text>}
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

export default withNamespaces(["settings"], { wait: true })(SettingsScreen);
