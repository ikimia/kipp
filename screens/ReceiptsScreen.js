import * as React from "react";
import Purchases from "../components/Purchases";
import AppHeader from "../components/AppHeader";
import Container from "../components/Container";

export default function ReceiptsScreen() {
  return (
    <Container>
      <AppHeader />
      <Purchases />
    </Container>
  );
}
