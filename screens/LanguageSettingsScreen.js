import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { LanguageStorage } from "../Storage";
import { SafeAreaView } from "react-navigation";
import DarkHeader from "../components/DarkHeader";
import { ScrollView } from "react-native-gesture-handler";
import ListHeader from "../components/ListHeader";
import ListItem from "../components/ListItem";
import Container from "../components/Container";

const ITEMS = ["en", "he"];

export default function LanguageSettingsScreen() {
  const { t, i18n } = useTranslation("settings");
  return (
    <Container>
      <SafeAreaView>
        <DarkHeader back title={t("language")} />
      </SafeAreaView>
      <ScrollView style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
        <ListHeader text={t("chooseLanguage")} />
        {ITEMS.map(code => (
          <ListItem
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
