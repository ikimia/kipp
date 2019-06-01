import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { LanguageStorage } from "../Storage";
import { ScrollView } from "react-native-gesture-handler";
import ListItem from "../components/ListItem";
import Container from "../components/Container";
import SmallHeader from "../components/SmallHeader";
import StyledText from "../components/StyledText";

const ITEMS = ["en", "he"];

export default function LanguageSettingsScreen() {
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <SmallHeader title={t("language")} />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, paddingTop: 20 }}>
          <StyledText bold size={18}>
            {t("chooseLanguage")}
          </StyledText>
        </View>
        {ITEMS.map((code, i) => (
          <ListItem
            first={i === 0}
            last={i === ITEMS.length - 1}
            key={code}
            noCheveron
            rightIcon={code === i18n.language ? "check" : null}
            onPress={() => {
              i18n.changeLanguage(code);
              LanguageStorage.set(code);
            }}
            text={t(code)}
          />
        ))}
      </ScrollView>
    </Container>
  );
}
