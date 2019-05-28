const {
  company: { companyName: getStoreName },
  address: { streetAddress: getStoreAddress }
} = require("faker");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://academic-works-241411.firebaseio.com"
});

const defineFunction = handler =>
  functions.region("europe-west1").https.onRequest(handler);

function auth(next) {
  return async function(req, res) {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    try {
      req.user = await admin.auth().verifyIdToken(tokenId);
      next(req, res);
    } catch (err) {
      res.status(401).send();
    }
  };
}

exports.getCode = defineFunction(
  auth((req, res) => {
    const code = Math.random()
      .toString(10)
      .slice(2, 8);
    res.json({ data: { code } });
  })
);

async function charge(price, storeName, topic) {
  await admin.messaging().send({ topic, data: { price, storeName } });
}

exports.charge = defineFunction(async (req, res) => {
  const { paymentCode: topic, price, storeName } = req.body;
  await charge(price, storeName, topic);
  res.json({ topic });
});

exports.demo = functions.https.onRequest(async (req, res) => {
  const { paymentCode: topic, price, storeName, secret } = req.body;
  if (secret !== "kippisbest") {
    return res.status(403).send();
  }
  await charge(price, storeName, topic);
  res.send();
});

exports.acceptPayment = defineFunction(
  auth(async (req, res) => {
    const uid = req.user.uid;
    const { storeName, price } = req.body.data;
    const created = admin.firestore.FieldValue.serverTimestamp();
    await admin
      .firestore()
      .collection("receipts")
      .add({ uid, storeName, price, created });
    res.json({ data: null });
  })
);

function repeat(num, func) {
  return Array(num)
    .fill()
    .map(() => func());
}

exports.getExploreData = defineFunction(
  auth(async (req, res) => {
    const lanes = [
      ["Featured", repeat(5, getStoreName)],
      ["Offers Memberships", repeat(5, getStoreName)]
    ];
    const sections = [
      ["Nearby", repeat(3, () => [getStoreName(), getStoreAddress()])],
      ["Recently Visited", repeat(3, () => [getStoreName(), getStoreAddress()])]
    ];
    res.json({ data: { lanes, sections } });
  })
);

exports.getUserMemberships = defineFunction(
  auth(async (req, res) => {
    res.json({ data: repeat(6, getStoreName) });
  })
);
