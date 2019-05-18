import React, { useEffect, useState, useContext } from "react";
import { Image, View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SocialProfile } from "../contexes/SocialProfile";
import Logo from "../components/Logo";

const CODE_TIMEOUT = 180;

const generateCode = () =>
  Math.random()
    .toString(10)
    .slice(2, 8);

function CountdownTimer({ code, onEnd }) {
  const [total, setTotal] = useState(CODE_TIMEOUT);
  useEffect(() => {
    setTotal(CODE_TIMEOUT);
    const timer = setInterval(() => {
      setTotal(prevTotal => {
        if (prevTotal > 0) {
          return prevTotal - 1;
        }
        clearInterval(timer);
        onEnd();
        return prevTotal;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [code]);
  const minutes = Math.floor(total / 60)
    .toString(10)
    .padStart(2, "0");
  const seconds = (total % 60).toString(10).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const BACKDROPS = [
  require("../img/backdrops/0.jpg"),
  require("../img/backdrops/1.jpg"),
  require("../img/backdrops/2.jpg"),
  require("../img/backdrops/3.jpg"),
  require("../img/backdrops/4.jpg"),
  require("../img/backdrops/5.jpg")
];

function getRandomBackdrop(prevIndex) {
  for (;;) {
    const index = Math.floor(Math.random() * BACKDROPS.length);
    if (index !== prevIndex) {
      return index;
    }
  }
}

export default function MainScren() {
  const [code, setCode] = useState(generateCode());
  const [backdropIndex, setBackdropIndex] = useState(getRandomBackdrop(-1));
  const { userProfile } = useContext(SocialProfile);
  const setNewCode = () => {
    setCode(generateCode());
    setBackdropIndex(getRandomBackdrop(backdropIndex));
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Image
        source={BACKDROPS[backdropIndex]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      />
      <View
        style={{
          backgroundColor: "black",
          opacity: 0.8,
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Logo color="white" fontSize={30} />
          <Text style={{ fontFamily: "Open Sans", color: "white" }}>
            {userProfile.name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              paddingTop: 60,
              paddingBottom: 50
            }}
          >
            <Text
              style={{ fontFamily: "Open Sans", color: "white", fontSize: 16 }}
            >
              Pay with One-Time Code:
            </Text>
            <Text
              style={{
                fontFamily: "Open Sans",
                color: "white",
                fontSize: 70,
                fontWeight: "bold"
              }}
            >
              {code.match(/.{3}/g).join(" ")}
            </Text>
            <View style={{ flex: 1 }} />
            <Text
              style={{ fontFamily: "Open Sans", color: "white", fontSize: 14 }}
            >
              The code is valid for the next{" "}
              <CountdownTimer code={code} onEnd={setNewCode} /> minutes
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={setNewCode}>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textDecorationLine: "underline"
                  }}
                >
                  Get Another Code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
