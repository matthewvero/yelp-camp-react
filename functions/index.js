const firebase = require("firebase");
const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const storage = require("firebase/storage");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
const axios = require("axios");

const clientId = "M3irlw78cMttVMn5eZd62VvZmcC";
const clientSecret =
	"aIne5sV9iHvLudxcwqFViNFn+1+qqp7lXqTIw2rUV8zoEILu7jZcFcdc4RG79d3zYQSMmI8XjyahGEPDfs/gdQ==";

const getAccessToken = async () => {
	return await axios({
		method: "post",
		url: "https://api.sirv.com/v2/token",
		data: {
			clientId,
			clientSecret,
		},
		headers: {
			"content-type": "application/json",
		},
	})
		.then((res) => {
			return res.data.token;
		})
		.catch((err) => {
			throw err;
		});
};

var app = express();

app.use(cors());

const saveTempImage = (base64String) => {
	// give file random name
	const fileName = Math.ceil(Math.random() * 100000).toString() + ".jpg";
	// Create temporary file
	const tempFilePath = path.join(os.tmpdir(), fileName);
	// Remove header from base64
	let base64Image = base64String.split(";base64,").pop();
	// save image in temporary file
	fs.writeFileSync(tempFilePath, base64Image, { encoding: "base64" });
	return { tempFilePath, fileName };
};

app.post("/newprofileimage", async (req, res, next) => {
	// Retrieve API token from SIRV CDN
	const accessToken = await getAccessToken();
	const body = JSON.parse(req.body);
	const { tempFilePath, fileName } = saveTempImage(body.base64ImageString);

	// Construct image path
	const URL = `https://api.sirv.com/v2/files/upload?filename=/yelpcamp/userprofiles/${body.userID}/${body.imagetype}/${fileName}`;

	try {
		fs.readFile(tempFilePath, async (err, data) => {
			if (err) throw new Error(err);
			// Upload image to CDN
			const upload = await axios({
				method: "post",
				url: URL,
				headers: {
					"content-type": "image/jpeg",
					authorization: `Bearer ${accessToken}`,
				},
				data: data,
			});

			// Save link to firestore for access by the client later
			try {
				if (upload.status === 200) {
					const queryRef = db
						.collection("userProfiles")
						.where("userID", "==", body.userID);
					const querySnapshot = await queryRef.get();
					const userProfileID = querySnapshot.docs[0].id;
					db.collection("userProfiles")
						.doc(userProfileID)
						.update({
							profileimages: admin.firestore.FieldValue.arrayUnion(
								`https://printrat.sirv.com/yelpcamp/userprofiles/${body.userID}/${body.imagetype}/${fileName}`
							),
						})
						.then(() => {
							res.status(200).send(
								"Upload Success"
							);
							return;
						})
						.catch((error) => {
							throw new Error(error);
						});
				} else if (upload.status !== 200) {
					throw new Error("File upload failed");
				}
			} catch (error) {
				res.send(error.message);
				return;
			}
		});
	} catch (error) {
		res.send(error.message);
		return;
	} finally {
		fs.unlinkSync(tempFilePath);
	}
	return;
});

console.log("Running");
exports.widgets = functions.https.onRequest(app);
