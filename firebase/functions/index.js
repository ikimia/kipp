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
    const tokenId = req.get("Authorization").slice("Bearer ".length);
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
  const created = admin.firestore.FieldValue.serverTimestamp();
  const ref = await admin
    .firestore()
    .collection("receipts")
    .add({ storeName, price, created, status: "pending" });
  await admin
    .messaging()
    .send({ topic, data: { price, storeName, orderId: ref.id } });
}

exports.demo = defineFunction(async (req, res) => {
  const { paymentCode: topic, price, storeName, secret } = req.body;
  if (secret !== "kippisbest") {
    return res.status(403).send();
  }
  await charge(price, storeName, topic);
  res.send();
});

exports.stores = defineFunction(async (req, res) => {
  res.send({ data: await getAllStores() });
});

exports.acceptPayment = defineFunction(
  auth(async (req, res) => {
    const uid = req.user.uid;
    const { orderId } = req.body.data;
    const orderRef = await admin
      .firestore()
      .collection("receipts")
      .doc(orderId);
    orderRef.set({ orderId, uid, status: "done" }, { merge: true });
    res.json({ data: { receiptId: orderId } });
  })
);

async function getAllStores() {
  const docs = await admin
    .firestore()
    .collection("stores")
    .get();
  const stores = [];
  docs.forEach(doc => {
    stores.push({
      id: doc.id,
      name: doc.get("name"),
      address1: doc.get("address1"),
      city: doc.get("city"),
      category: doc.get("category"),
      logoURL: doc.get("logoURL")
    });
  });
  return stores;
}

exports.getExploreData = defineFunction(
  auth(async (req, res) => {
    const allStores = await getAllStores();
    res.json({
      data: {
        featured: allStores.slice(0, 5),
        offersMembership: allStores.slice(5, 10),
        nearby: allStores.slice(-6, -3),
        recentlyVisited: allStores.slice(-3)
      }
    });
  })
);

exports.getExploreListStores = defineFunction(
  auth(async (req, res) => {
    res.json({ data: await getAllStores() });
  })
);
