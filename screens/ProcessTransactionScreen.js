import React from "react";
import { View } from "react-native";
import { Button, Spinner, Container, Text, Header } from "native-base";
import StyleSheets from "../constants/StyleSheets";

export default class ProcessTransactionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Sending Transaction",
      done: false
    };
    setTimeout(() => this.setState({ text: "Authorizing" }), 1000);
    setTimeout(() => this.setState({ text: "Capturing" }), 2000);
    setTimeout(() => this.setState({ done: true }), 3200);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header />
        <View alignItems={"center"} style={StyleSheets.f1}>
          <View style={StyleSheets.f1}>
            {this.state.done ? null : <Spinner />}
            {this.state.done ? null : <Text>{this.state.text}</Text>}
          </View>
          <View style={StyleSheets.f4}>
            <Button
              title={"Done"}
              disabled={!this.state.done}
              onPress={() => {
                navigate("Pay");
              }}
              style={[StyleSheets.button, { height: 80, width: 200 }]}
            >
              <Text
                style={[
                  StyleSheets.textCenter,
                  StyleSheets.textSize3,
                  StyleSheets.textBold
                ]}
              >
                Done
              </Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
