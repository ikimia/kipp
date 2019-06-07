import * as React from "react";
import { useContext, useState } from "react";
import { View, StatusBar } from "react-native";
import {
  SafeAreaView,
  NavigationContext,
  NavigationEvents
} from "react-navigation";
import { AccessToken } from "react-native-fbsdk";
import Carousel, { Pagination } from "react-native-snap-carousel";

import Logo from "../components/Logo";
import FBLoginButton from "../components/FBLoginButton";
import Backdrop, { PATTERNS } from "../components/Backdrop";
import { signIn } from "../Backend";
import StyledText from "../components/StyledText";

const TOUR = [
  {
    title: "Welcome to Kipp",
    text: "Your life are about to change!\nSwipe to know more."
  },
  {
    title: "Say Your Wallet Goodbye",
    text:
      "Kipp lets you pay without your wallet.\nOnce everything is set, your credit card will be stored on your device."
  },
  {
    title: "Get Promotions You Want",
    text:
      "Based on what you buy, we will show you only the promotions that you are interested in.\nNo BS, we promise."
  },
  {
    title: "Ready to Get Started?",
    text: "Start by pressing Login with Facebook below."
  }
];

export default function AuthenticationFlow() {
  const { navigate } = useContext(NavigationContext);
  const login = async () => {
    const accessToken = await AccessToken.getCurrentAccessToken();
    if (!accessToken) {
      return;
    }
    await signIn(accessToken.accessToken);
    navigate("App");
  };
  const [carouselWidth, setCarouselWidth] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
      <NavigationEvents
        onWillFocus={() => {
          StatusBar.setBarStyle("light-content");
        }}
      />
      <Backdrop pattern={PATTERNS[2]} />
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Logo fontSize={100} color="white" />
      </View>
      <View
        style={{
          flex: 6,
          marginBottom: 20,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: 15,
          paddingBottom: 0,
          borderRadius: 10
        }}
      >
        <View
          style={{ flex: 1 }}
          onLayout={e => {
            setCarouselWidth(e.nativeEvent.layout.width);
          }}
        >
          {carouselWidth && (
            <Carousel
              data={TOUR}
              onSnapToItem={setActiveSlide}
              sliderWidth={carouselWidth}
              itemWidth={carouselWidth}
              renderItem={({ item: { title, text } }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <StyledText
                    bold
                    color="white"
                    size={18}
                    style={{ marginBottom: 15 }}
                  >
                    {title}
                  </StyledText>
                  <StyledText color="white" align="center">
                    {text}
                  </StyledText>
                </View>
              )}
            />
          )}
        </View>
        <Pagination
          dotColor="white"
          inactiveDotColor="white"
          dotsLength={TOUR.length}
          activeDotIndex={activeSlide}
        />
      </View>
      <FBLoginButton onLogin={login} />
    </SafeAreaView>
  );
}
