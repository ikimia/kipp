import * as React from "react";
import { Image } from "react-native";

const faker = require("faker");
faker.seed(127);

export function getCompanyName() {
  return faker.company.companyName();
}

export function getCompanyAddress() {
  return faker.address.streetAddress();
}

export function RandomLogo({ height = 120, width = 120 }) {
  return (
    <Image
      style={{ height, width, borderRadius: 3 }}
      source={{ uri: `https://picsum.photos/${width}/${height}` }}
    />
  );
}
