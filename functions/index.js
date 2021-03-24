const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
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

app.post("/newimage/:collection/:uid/:imagetype", async (req, res, next) => {
	// Retrieve API token from SIRV CDN
	const accessToken = await getAccessToken();
	const body = JSON.parse(req.body);
	const { tempFilePath, fileName } = saveTempImage(body.base64ImageString);
	const { collection, uid, imagetype } = req.params;

	// Construct image path
	const imagePath = `${collection}/${uid}/${
		imagetype !== "campsiteimage" && imagetype + "/"
	}${fileName}`;
	const URL = `https://api.sirv.com/v2/files/upload?filename=/yelpcamp/${imagePath}`;

	try {
		fs.readFile(tempFilePath, async (err, data) => {
			try {
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

				if (upload.status === 200) {
					const queryRef = db
						.collection(collection)
						.where("uid", "==", uid);
					const querySnapshot = await queryRef.get();
					const docID = querySnapshot.docs[0].id;
					console.log(querySnapshot);
					db.collection(collection)
						.doc(docID)
						.update({
							[imagetype !== "campsiteimage"
								? imagetype
								: "images"]: admin.firestore.FieldValue.arrayUnion(
								{
									link: `https://printrat.sirv.com/yelpcamp/${imagePath}`,
									filename: fileName,
								}
							),
						})
						.then(() => {
							res.status(200).send(
								"Upload Success"
							);
							return;
						})
						.catch((error) => {
							throw new Error(error.message);
						});
				} else if (upload.status !== 200) {
					throw new Error("File upload failed");
				}
			} catch (error) {
				res.send({
					status: 500,
					error: error.message,
				});
				return;
			}
		});
	} catch (error) {
		res.send({ status: 500, error: error.message });
		return;
	} finally {
		fs.unlinkSync(tempFilePath);
	}
	return;
});

console.log("Running");
exports.widgets = functions.https.onRequest(app);
