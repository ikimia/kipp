import * as firebase from "firebase/app";

export async function getCode() {
  const getCodeFromBackend = firebase.functions().httpsCallable("getCode");
  const result = await getCodeFromBackend();
  return result.data.code;
}
