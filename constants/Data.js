const toItem = ([description, count, price]) => ({
  description,
  count,
  price
});

export const items = [
  ["Cheese Burger", 1, 12],
  ["Chicken nuggets", 2, 4],
  ["French Fries", 2, 3],
  ["French Pizza", 2, 12],
  ["Shamrock Fries", 2, 3],
  ["French Burger", 3, 3],
  ["Shamrock Shake", 1, 8]
].map(toItem);

export const storeName = "McDonald's";

export const taxes = 10;

export const totalAmount =
  items.map(({ price, count }) => price * count).reduce((a, b) => a + b, 0) +
  taxes;
