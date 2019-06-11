const offers = {
  "12312": {
    id: "12312",
    storeName: "McDonalds",
    address: "Ibn Gabirol St 92",
    text: "Get a beach towel with this coupon",
    code: "51231"
  },
  "2222": {
    id: "2222",
    storeName: "Burger King",
    address: "Ibn Gabirol St 92",
    text: "Get a free burger",
    starred: true,
    code: "94120"
  },
  "333": {
    id: "333",
    storeName: "Otello",
    address: "Dizengoff St 151",
    text: "Get free ice scream",
    code: "48163"
  },
  "444": {
    id: "444",
    storeName: "Arcaffe",
    address: "Ibn Gabirol St 100",
    text: "Free coffee with every sandwich",
    code: "13997"
  }
};

export function getOffers() {
  return Promise.resolve(Object.values(offers));
}

export function getOffer(offerId) {
  return Promise.resolve(offers[offerId]);
}
