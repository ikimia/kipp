const toItem = ([description, count, price]) => ({
  description,
  count,
  price
});

export const items = [
  ["product1", 1, 12],
  ["product2", 2, 4],
  ["product3", 2, 3],
  ["product4", 2, 12],
  ["product5", 2, 3],
  ["product6", 3, 3],
  ["product7", 1, 8]
].map(toItem);

export const taxes = 10;

export const totalAmount =
  items.map(({ price, count }) => price * count).reduce((a, b) => a + b, 0) +
  taxes;
