const admin = require("firebase-admin");
const offersCollection = admin.firestore().collection("offers");

async function resolveOffer(ref) {
  const offerData = await ref.get();
  const store = await offerData.get("store").get();
  return Object.assign({}, offerData.data(), {
    store: store.data(),
    id: ref.id
  });
}

exports.getOffers = async (req, res) => {
  const data = [];
  const offers = await offersCollection.listDocuments();
  for (const offer of offers) {
    data.push(await resolveOffer(offer));
  }
  res.json({ data });
};

exports.revealOffer = async (req, res) => {
  const { offerId } = req.body.data;
  const offer = await offersCollection.doc(offerId);

  res.json({
    data: Object.assign({ code: "1235" }, await resolveOffer(offer))
  });
};
