import firebase from "react-native-firebase";

firebase.functions().useFunctionsEmulator("http://localhost:5000");

export async function getCode() {
  const getCodeFromBackend = firebase.functions().httpsCallable("getCode");
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
