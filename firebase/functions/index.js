const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://academic-works-241411.firebaseio.com"
});

exports.getCode = functions.https.onRequest((req, res) => {
  const code = Math.random()
    .toString(10)
    .slice(2, 8);
  res.json({ data: { code } });
});

exports.charge = functions.https.onRequest(async (req, res) => {
  const { paymentCode: topic, price, storeName } = req.body;
  const message = {
    data: { price, storeName },
    topic
  };
  await admin.messaging().send(message);
  res.json({ topic });
});

exports.accept = functions.https.onRequest(async (req, res) => {
  res.json({ status: "ok" });
});
