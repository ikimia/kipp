const admin = require("firebase-admin");

const storesCollection = admin.firestore().collection("stores");

async function getAllStores() {
  const docs = await storesCollection.get();
  const data = [];
  docs.forEach(doc => {
    data.push({
      id: doc.id,
      name: doc.get("name"),
      address1: doc.get("address1"),
      city: doc.get("city"),
      category: doc.get("category"),
      logoURL: doc.get("logoURL")
    });
  });
  return data;
}

exports.getExploreListStores = async (req, res) => {
  res.json({ data: await getAllStores() });
};

exports.getExploreData = async (req, res) => {
  const allStores = await getAllStores();
  res.json({
    data: {
      featured: allStores.slice(0, 5),
      offersMembership: allStores.slice(5, 10),
      nearby: allStores.slice(-6, -3),
      recentlyVisited: allStores.slice(-3)
    }
  });
};

exports.stores = async (req, res) => {
  res.send({ data: await getAllStores() });
};

exports.stores.noAuth = true;
