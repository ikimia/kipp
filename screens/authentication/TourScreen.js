import * as React from "react";
import { useContext, useState } from "react";
import { View, StatusBar } from "react-native";
import {
  SafeAreaView,
  NavigationContext,
  NavigationEvents
} from "react-navigation";

import Logo from "../../components/Logo";
import Backdrop, { PATTERNS } from "../../components/Backdrop";
import StyledText from "../../components/StyledText";
import { RectButton } from "react-native-gesture-handler";

const TOUR = [
  {
    emoji: "👋",
    title: "Welcome to Kipp",
    text: "Your life is about to change!\nContinue to know more."
  },
  {
    emoji: "💸",
    title: "Say Goodbye to Your Wallet",
    text:
      "Kipp lets you pay without your wallet.\nOnce everything is set, your credit card will be stored on your device."
  },
  {
    emoji: "🔒",
    title: "Be More Secure",
    text:
      "When you pay with Kipp, nobody gets your credit card number. It will always be safe with you."
  },
  {
    emoji: "🎁",
    title: "Get The Promotions You Want",
    text:
      "Based on what you buy, we will show you only the promotions that you are interested in.\nNo BS, we promise."
  },
  {
    emoji: "💃",
    title: "Ready to Get Started?",
    text: "Continue and sign in."
  }
];

function Pagination({ size, index }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(size)].map((_, i) => (
        <View
          key={i}
          style={{
            marginHorizontal: 5,
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: "white",
            opacity: i === index ? 1 : 0.2
          }}
        />
      ))}
    </View>
  );
}

function ContinueButton({ onPress }) {
  return (
    <RectButton
      style={{
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
      }}
      onPress={onPress}
    >
      <View>
        <StyledText color="white" size={16} bold>
          CONTINUE
        </StyledText>
      </View>
    </RectButton>
  );
}

export default function TourScreen() {
  const { navigate } = useContext(NavigationContext);
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <NavigationEvents
        onWillFocus={() => {
          StatusBar.setBarStyle("light-content");
        }}
      />
      <Backdrop pattern={PATTERNS[1]} />
      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Pagination size={TOUR.length} index={activeSlide} />
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Logo fontSize={100} color="white" />
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <StyledText
          fontFamily="Noto Emoji"
          size={60}
          color="white"
          style={{ marginBottom: 10 }}
        >
          {TOUR[activeSlide].emoji}
        </StyledText>
        <StyledText bold color="white" size={18} style={{ marginBottom: 15 }}>
          {TOUR[activeSlide].title}
        </StyledText>
        <StyledText color="white" align="center">
          {TOUR[activeSlide].text}
        </StyledText>
      </View>
      <View style={{ marginVertical: 20 }}>
        <ContinueButton
          onPress={
            activeSlide < TOUR.length - 1
              ? () => setActiveSlide(n => n + 1)
              : () => navigate("Login")
          }
        />
      </View>
    </SafeAreaView>
  );
}
