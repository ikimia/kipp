import React, { useContext } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Title,
  Right
} from "native-base";
import { SocialProfile } from "../contexes/SocialProfile";
import { useTranslation } from "react-i18next";
import BackButton from "../components/BackButton";

export default function SocialProfileScreen() {
  const { userProfile, logout } = useContext(SocialProfile);
  const { t } = useTranslation("socialNetworks");
  return (
    <Container>
      <Header>
        <Left>
          <BackButton />
        </Left>
        <Body>
          <Title>{t("socialProfile")}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem>
            <Left>
              <Body>
                <Text>{userProfile.name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image
                source={{ uri: userProfile.picture }}
                style={{ height: 300, width: 300, flex: 1 }}
              />
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                textStyle={{ color: "#87838B" }}
                onPress={logout}
              >
                <Icon name="log-out" />
                <Text>{t("logout")}</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
