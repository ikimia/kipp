const admin = require("firebase-admin");

const receiptsCollection = admin.firestore().collection("receipts");

exports.acceptPayment = async (req, res) => {
  const uid = req.user.uid;
  const { orderId } = req.body.data;
  const orderRef = await receiptsCollection.doc(orderId);
  orderRef.set({ orderId, uid, status: "done" }, { merge: true });
  res.json({ data: { receiptId: orderId } });
};

exports.getCode = (req, res) => {
  const code = Math.random()
    .toString(10)
    .slice(2, 8);
  res.json({ data: { code } });
};

async function charge(price, storeName, topic) {
  const created = admin.firestore.FieldValue.serverTimestamp();
  const ref = await receiptsCollection.add({
    storeName,
    price,
    created,
    status: "pending"
  });
  await admin
    .messaging()
    .send({ topic, data: { price, storeName, orderId: ref.id } });
}

exports.demo = async (req, res) => {
  const { paymentCode: topic, price, storeName, secret } = req.body;
  if (secret !== "kippisbest") {
    return res.status(403).send();
  }
  await charge(price, storeName, topic);
  res.send();
};
exports.demo.noAuth = true;
