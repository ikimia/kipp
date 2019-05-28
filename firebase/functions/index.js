const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://academic-works-241411.firebaseio.com"
});

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

exports.getCode = functions.https.onRequest(
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

exports.charge = functions.https.onRequest(async (req, res) => {
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

exports.acceptPayment = functions.https.onRequest(
  auth(async (req, res) => {
    const uid = req.user.uid;
    const { storeName, price } = req.body.data;
    const created = admin.firestore.FieldValue.serverTimestamp();
    admin
      .firestore()
      .collection("receipts")
      .add({ uid, storeName, price, created });
    res.json({ data: null });
  })
);
