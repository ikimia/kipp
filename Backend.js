import * as firebase from "firebase/app";
import "firebase/functions";

firebase.initializeApp({
  apiKey: "AIzaSyA1k_ABLit8ZREapKqb9KZ-dlaI-mOt1E0",
  authDomain: "academic-works-241411.firebaseapp.com",
  databaseURL: "https://academic-works-241411.firebaseio.com",
  projectId: "academic-works-241411",
  storageBucket: "academic-works-241411.appspot.com",
  messagingSenderId: "415674172830",
  appId: "1:415674172830:web:09670deb38f323cc"
});
firebase.functions().useFunctionsEmulator("http://localhost:5000");

export async function getCode() {
  const getCodeFromBackend = firebase.functions().httpsCallable("getCode");
  const result = await getCodeFromBackend();
  return result.data.code;
}
