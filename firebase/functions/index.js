const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://academic-works-241411.firebaseio.com"
});

const defineFunction = functions.region("europe-west1").https.onRequest;

function auth(next) {
  return async function(req, res) {
    if (next.noAuth) {
      next(req, res);
      return;
    }
    try {
      const tokenId = req.get("Authorization").slice("Bearer ".length);
      req.user = await admin.auth().verifyIdToken(tokenId);
      next(req, res);
    } catch (err) {
      res.status(401).send("unauthorized");
    }
  };
}

function register(module) {
  Object.assign(
    exports,
    Object.keys(module).reduce(function(result, key) {
      result[key] = defineFunction(auth(module[key]));
      return result;
    }, {})
  );
}

register(require("./offers"));
register(require("./payment"));
register(require("./explore"));
