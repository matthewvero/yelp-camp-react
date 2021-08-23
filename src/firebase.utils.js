import firebase from "firebase/app";
import { db, auth } from "./firebase";
import store from "./redux/store";
import { destroySession } from "./redux/auth-redux/auth.actions";

const functionsURL =
	window.location.hostname === "localhost"
		? "http://localhost:5001/yelpcamp-d57d1/us-central1/widgets"
		: "https://us-central1-yelpcamp-d57d1.cloudfunctions.net/widgets";

// CAMPSITE UTILITIES

export const getUserCampsites = (setCamps, userID) => {
	const campsites = db.collection("campsites").where("owner", "==", userID); // Need to load campsites in chronological order

	const unsub = campsites.onSnapshot((snapshot) => {
		let campsitesArr = [];
		snapshot.forEach((el) => {
			campsitesArr.push(el.data());
		});
		setCamps(campsitesArr);
	});

	return unsub;
};

export async function getCampsite(id) {
	if (id) {
		const campsiteRef = db.collection("campsites").doc(id);
		const campsite = await campsiteRef.get();
		return campsite.data();
	}
}

export const addCampsite = async ({ campsite, image }) => {
	// On completion of image upload write data to firestore
	const user = store.getState().authReducer.user;
	if (user.uid) {
		// Add created date
		const timestamp = firebase.firestore.FieldValue.serverTimestamp;
		try {
			// Get random document ID
			const newCampsiteRef = db.collection("campsites").doc();
			const newCampsite = await newCampsiteRef.get();

			// Add campsite data
			await db
				.collection("campsites")
				.doc(newCampsite.id)
				.set({
					...campsite,
					createdAt: timestamp(),
					likedBy: [],
					// Insert ID inside new doc so that it can be used later.
					uid: newCampsite.id,
				});
			// Add campsite image
			const url = `campsites/${newCampsite.id}/campsiteimage`;
			const newImageRes = await addImage(image, url);

			if (!newImageRes.status === 200) {
				await db
					.collection("campsites")
					.doc(newCampsite.id)
					.delete();
				throw new Error(newImageRes);
			} else if (newImageRes.status === 200) {
				return newImageRes;
			}
		} catch (err) {
			return new Error("Failed to create campsite." + err.message);
		}

		// Upload image to folder under campsite ID
	}
};

export const likeCampsite = async (campsiteID, userID, liked) => {
	try {
		if (userID) {
			const campsiteRef = db
				.collection("campsites")
				.doc(campsiteID);
			const userRef = db.collection("userprofiles").doc(userID);

			if (liked) {
				campsiteRef.update({
					likedBy: firebase.firestore.FieldValue.arrayRemove(
						userID
					),
				});
				userRef.update({
					likes: firebase.firestore.FieldValue.arrayRemove(
						campsiteID
					),
				});
			} else {
				campsiteRef.update({
					likedBy: firebase.firestore.FieldValue.arrayUnion(
						userID
					),
				});

				userRef.update({
					likes: firebase.firestore.FieldValue.arrayUnion(
						campsiteID
					),
				});
			}
		} else {
			alert("You need to be signed in to do that");
		}
	} catch (err) {
		alert(err.message);
	}
};

// REVIEW UTILITIES

export const getReviews = async (campsiteID) => {
	try {
		const reviewRef = await db
			.collection("reviews")
			.where("campsiteID", "==", campsiteID)
			.get();
		const reviews = reviewRef.docs.map((el) => el.data());
		return reviews;
	} catch (err) {
		throw new Error(err.message);
	}
};

// USER UTILITIES

export function logOut(history) {
	auth.signOut();
	store.dispatch(destroySession());
	history.push("/home");
}

// change
export const updateUserProfile = async (obj) => {
	const user = store.getState().authReducer.user;
	const userProfileRef = db.collection("userprofiles").doc(user.uid);
	try {
		userProfileRef.update(obj);
	} catch (err) {
		throw new Error(err.message);
	}
};

export const addDocument = async (obj, collection) => {
	const user = store.getState().authReducer.user;
	if (user.uid) {
		const docRef = db.collection(collection).doc();
		docRef.set({
			...obj,
			uid: docRef.id,
		});
	} else {
		const event = new CustomEvent("alert", {
			detail: `You need to be signed in to do that!`,
		});
		window.dispatchEvent(event);
	}
};

export const updateDocument = async (obj, collection, docID) => {
	const docRef = db.collection(collection).doc(docID);
	await docRef.update(obj);
};

export const deleteDocument = async (collection, doc) => {
	await db.collection(collection).doc(doc).delete();
};

const uploadImage = async (encodedImage, url) => {
	try {
		const res = await fetch(`${functionsURL}/newimage/${url}`, {
			// Your POST endpoint
			method: "POST",
			body: JSON.stringify({
				base64ImageString: encodedImage,
			}),
		});
		if (res && res.status === 200) {
			return res;
		} else {
			throw new Error(res);
		}
	} catch (err) {
		const event = new CustomEvent("alert", {
			detail: `Something went wrong!` + err.message,
		});
		window.dispatchEvent(event);
	}
};

export const addImage = (image, url) => {
	return new Promise((resolve, reject) => {
		if (image) {
			//read data from the blob objects(file)
			let reader = new FileReader();
			//reads the binary data and encodes it as base64 data url
			reader.readAsDataURL(image);
			//reads it finish with either success or failure
			reader.onloadend = async () => {
				//reader.result is the result of the reading in base64 string
				try {
					const res = await uploadImage(reader.result, url);
					if (res && res.status === 200) {
						resolve(res);
					}
				} catch (err) {
					reject(err);
				}
			};
		}
	});
};
