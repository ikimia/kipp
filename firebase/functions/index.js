const functions = require("firebase-functions");

exports.getCode = functions.https.onRequest((request, response) => {
  const code = Math.random()
    .toString(10)
    .slice(2, 8);
  response.json({ data: { code } });
});
