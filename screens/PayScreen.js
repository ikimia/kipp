import React from "react";
import { withNamespaces } from "react-i18next";
import { StyleSheet } from "react-native";
import CodeInput from "../components/CodeInput";
import {
  Button,
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title
} from "native-base";
import StyleSheets from "../constants/StyleSheets";

class PayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.text = { state: { value: "" } };
    this.state = {
      receiptNumber: "12345",
      buttonDisabled: false
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    const { t } = this.props;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Pay</Title>
          </Body>
          <Right />
        </Header>
        <Content
          style={[styles.container, StyleSheets.container]}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={styles.title}>{t("pay:receiptNumber")}</Text>
          <CodeInput
            size={5}
            style={{ marginBottom: 15 }}
            onUpdate={receiptNumber =>
              this.setState({
                receiptNumber,
                buttonDisabled: receiptNumber.length !== 5
              })
            }
            ref={ref => {
              this.text = ref;
            }}
          />
          <Button
            disabled={this.state.buttonDisabled}
            title={"Proceed"}
            onPress={() => {
              this.text.blur();
              navigate("Confirm", { receiptNumber: this.state.receiptNumber });
            }}
            style={[StyleSheets.button, StyleSheets.mt5, { height: 80 }]}
          >
            <Text
              style={[
                StyleSheets.textCenter,
                StyleSheets.textSize3,
                StyleSheets.textBold
              ]}
            >
              {t("pay:proceed")}
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(PayScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1
  },
  title: {
    fontSize: 15,
    marginBottom: 10
  },
  button: {
    alignSelf: "center"
  }
});
