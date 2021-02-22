const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		functions.logger.info("Hello logs!", { structuredData: true });
		res.send("Hello from Firebase!");
	});
});
