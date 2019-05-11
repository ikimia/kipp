import * as React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import BackButton from "../components/BackButton";
import { TextInput } from "react-native-gesture-handler";

export default function StoresScreen() {
  return (
    <View>
      <SafeAreaView>
        <View>
          <BackButton />
          <Text>Stores</Text>
          <TextInput />
        </View>
      </SafeAreaView>
    </View>
  );
}
