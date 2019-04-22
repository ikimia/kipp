import React, { useContext } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem
} from "native-base";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";
import ArrowIcon from "../components/ArrowIcon";
import AlignedText from "../components/AlignedText";
import { NavigationContext } from "react-navigation";

export default function PaymentSettingsScreen() {
  const navigation = useContext(NavigationContext);
  const { t } = useTranslation("settings");
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>{t("myAccount")}</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#f4f4f4" }}>
        <List style={{ backgroundColor: "white" }}>
          <ListItem itemDivider />
          <ListItem
            noIndent
            icon
            last
            onPress={() => navigation.navigate("SocialProfile")}
          >
            <Body>
              <AlignedText>{t("socialNetworks:socialProfile")}</AlignedText>
            </Body>
            <Right>
              <ArrowIcon />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}
