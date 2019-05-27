import firebase from "react-native-firebase";

const functions = firebase.functions();

// eslint-disable-next-line no-undef
if (__DEV__) {
  functions.useFunctionsEmulator("http://localhost:5001");
}

export async function getCode() {
  const getCodeFromBackend = functions.httpsCallable("getCode");
  const result = await getCodeFromBackend();
  return result.data.code;
}

export function subscribe(topic, onMessage) {
  firebase.messaging().subscribeToTopic(topic);
  firebase.messaging().onMessage(onMessage);
}

export function unsubscribe(topic) {
  firebase.messaging().unsubscribeFromTopic(topic);
}

export async function acceptPayment(storeName, price) {
  const acceptPaymentFunction = functions.httpsCallable("acceptPayment");
  await acceptPaymentFunction({ storeName, price });
}

export async function signIn(facebookAccessToken) {
  await firebase
    .auth()
    .signInWithCredential(
      firebase.auth.FacebookAuthProvider.credential(facebookAccessToken)
    );
}

export async function signOut() {
  await firebase.auth().signOut();
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function reportNavigation(screenName) {
  firebase.analytics().setCurrentScreen(screenName);
}
