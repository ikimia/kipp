import * as React from "react";
import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import Animation from "lottie-react-native";
import bubble from "../assets/lottie/bubble.json";
import checkmark from "../assets/lottie/checkmark.json";
import processing from "../assets/lottie/processing.json";

export function Bubbles({ shouldFinish, onDone }) {
  const progress = useRef(new Animated.Value(0)).current;
  const persistentShouldFinish = useRef({ value: false }).current;
  const finishBubbling = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear
    }).start(() => {
      onDone();
    });
  };
  const startBubbling = () => {
    Animated.timing(progress, {
      toValue: 0.8,
      duration: 3000,
      easing: Easing.linear
    }).start(() => {
      if (persistentShouldFinish.value) {
        finishBubbling();
        return;
      }
      progress.setValue(0.1);
      startBubbling();
    });
  };
  const startAnimation = () => {
    Animated.timing(progress, {
      toValue: 0.1,
      duration: 250,
      easing: Easing.linear
    }).start(() => {
      startBubbling();
    });
  };
  useEffect(() => {
    startAnimation();
  }, []);
  useEffect(() => {
    persistentShouldFinish.value = shouldFinish;
  }, [shouldFinish]);
  return (
    <Animation
      style={{ width: 150, height: 150 }}
      progress={progress}
      source={bubble}
      autoPlay={false}
    />
  );
}

export function Checkmark() {
  return (
    <Animation
      style={{ width: 150, height: 150 }}
      source={checkmark}
      autoPlay={true}
      loop={false}
    />
  );
}

export function Processing() {
  return (
    <Animation
      source={processing}
      style={{ width: 150, height: 150 }}
      autoPlay
    />
  );
}
