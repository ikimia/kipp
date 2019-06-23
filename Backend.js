import firebase from "react-native-firebase";

const functions = firebase.functions("europe-west1");

// eslint-disable-next-line no-undef
if (__DEV__) {
  functions.useFunctionsEmulator("http://localhost:5001");
}

function firebaseFunction(funcName) {
  return async function(...args) {
    const callable = functions.httpsCallable(funcName);
    const result = await callable(...args);
    return result.data;
  };
}
export const getCode = firebaseFunction("getCode");
export const acceptPayment = firebaseFunction("acceptPayment");
export const getExploreData = firebaseFunction("getExploreData");
export const getExploreListStores = firebaseFunction("getExploreListStores");
export const getOffers = firebaseFunction("getOffers");
export const revealOffer = firebaseFunction("revealOffer");

export function onChargeAttempt(handler) {
  return firebase.messaging().onMessage(handler);
}

export function subscribe(topic) {
  firebase.messaging().subscribeToTopic(topic);
  return () => firebase.messaging().unsubscribeFromTopic(topic);
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

const createReceipt = async doc => {
  const store = await doc.get("store").get();

  return {
    id: doc.id,
    uid: doc.get("uid"),
    storeName: store.get("name"),
    logoURL: store.get("logoURL"),
    price: doc.get("price"),
    created: doc.get("created").toMillis()
  };
};

export async function getReceipts() {
  const docs = await firebase
    .firestore()
    .collection("receipts")
    .where("uid", "==", getCurrentUser().uid)
    .get();
  let receipts = [];
  docs.forEach(doc => receipts.push(createReceipt(doc)));
  receipts = await Promise.all(receipts);
  receipts.sort((a, b) => b.created - a.created);
  return receipts;
}

export async function getReceipt(id) {
  const doc = await firebase
    .firestore()
    .collection("receipts")
    .doc(id)
    .get();
  return createReceipt(doc);
}
