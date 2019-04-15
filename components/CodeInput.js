import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  ViewPropTypes
} from "react-native";

export default class CodeInput extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    size: PropTypes.number.isRequired,
    onUpdate: PropTypes.func
  };

  state = {
    value: ""
  };

  render() {
    return (
      <View style={[styles.code, this.props.style]}>
        <TextInput
          style={{ display: "none" }}
          ref={ref => (this.text = ref)}
          returnKeyType="done"
          keyboardType="number-pad"
          onChangeText={text => {
            this.setState({ value: text });
            if (this.props.onUpdate) this.props.onUpdate(text);
          }}
          maxLength={this.props.size}
        />
        {new Array(this.props.size).fill(null).map((_, i) => (
          <TouchableWithoutFeedback key={i} onPress={() => this.text.focus()}>
            <View style={styles.receiptNumber}>
              <Text style={styles.digit}>{this.state.value[i] || ""}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }

  blur() {
    this.text.blur();
  }
}

const styles = StyleSheet.create({
  code: {
    display: "flex",
    flexDirection: "row"
  },
  receiptNumber: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 50,
    borderBottomWidth: 3,
    borderColor: "black",
    marginRight: 10,
    marginLeft: 10
  },
  digit: {
    fontSize: 30
  }
});
