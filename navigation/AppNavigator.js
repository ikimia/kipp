import React from "react";
import { I18nManager } from "react-native";
import { withNamespaces } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";

const setI18nConfig = () => {
  const [locale] = RNLocalize.getLocales();
  const { isRTL } = locale;
  I18nManager.forceRTL(isRTL);
};

const Stack = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator
});

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
class WrappedStack extends React.Component {
  static router = Stack.router;

  constructor(props) {
    super(props);
    setI18nConfig();
  }

  componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <Stack
        style={{ direction: i18n.language.startsWith("he") ? "rtl" : "ltr" }}
        screenProps={{ t }}
        {...this.props}
      />
    );
  }
}

const ReloadAppOnLanguageChange = withNamespaces("common", {
  bindI18n: "languageChanged",
  bindStore: false
})(createAppContainer(WrappedStack));

export default ReloadAppOnLanguageChange;
