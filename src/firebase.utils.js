import firebase from "firebase/app";
import { db, storage, auth } from "./firebase";
import store from "./redux/store";
import { destroySession } from "./redux/auth-redux/auth.actions";

// CAMPSITE UTILITIES
const storageRef = storage.ref();

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

export const updateCampsite = async (campsite, key, value) => {
	const user = store.getState().authReducer.user;
	if (campsite.owner === user.uid) {
		const campsiteRef = db.collection("campsites").doc(campsite.uid);
		const res = await campsiteRef.update({ [key]: value });
		return res;
	}
};

export const likeCampsite = async (campsiteID, userID, liked) => {
	if (userID) {
		const campsiteRef = db.collection("campsites").doc(campsiteID);
		liked
			? campsiteRef
					.update({
						likedBy: firebase.firestore.FieldValue.arrayRemove(
							userID
						),
					})
					.catch((err) => alert("Something Went Wrong"))
			: campsiteRef
					.update({
						likedBy: firebase.firestore.FieldValue.arrayUnion(
							userID
						),
					})
					.catch((err) => alert("Something Went Wrong"));
	} else {
		alert("You need to be signed in to do that");
	}
};

// COMMENT UTILITIES

export const addComment = async (userID, comment, campsiteID) => {
	if (userID) {
		// Create reference for new camp to get random ID
		const newComment = db.collection("comments").doc();
		const newCommentRef = await newComment.get();
		const data = {
			user: userID,
			comment,
			campsiteID,
			commentID: newCommentRef.id,
		};
		db.collection("comments")
			.doc(newCommentRef.id)
			.set(data)
			.catch(() => {
				alert("Oops! Something went wrong.");
			});
	} else {
		alert("You need to be signed in to do that");
	}
};

// REVIEW UTILITIES

export const addReview = async (campsiteID, data) => {
	const user = store.getState().authReducer.user;
	if (user.uid) {
		const reviewRef = db.collection("reviews").doc();
		reviewRef.set({
			campsiteID,
			userID: user.uid,
			data,
			reviewID: reviewRef.id,
		});
	} else {
		alert("You need to be signed in to do that");
	}
};

export const updateReview = async (review) => {
	db.collection("reviews")
		.doc(review.reviewID)
		.update(review)
		.catch((err) => alert("Oops! Something went wrong."));
};

export const deleteReview = async (review) => {
	db.collection("reviews")
		.doc(review)
		.delete()
		.catch(() => {
			alert("Oops! Something went wrong.");
		});
};

export const getReviews = async (campsiteID) => {
	const reviewRef = await db
		.collection("reviews")
		.where("campsiteID", "==", campsiteID)
		.get();
	const reviews = reviewRef.docs.map((el) => el.data());
	return reviews;
};

// USER UTILITIES

export function logOut(history) {
	auth.signOut();
	store.dispatch(destroySession());
	history.push("/home");
}

export const getUserProfile = async (userID) => {
	const userRef = await db
		.collection("userProfiles")
		.where("userID", "==", userID)
		.get();
	if (userRef.docs.length) {
		const userProfile = userRef.docs[0].data();
		return userProfile;
	} else {
		return {};
	}
};

export const updateUserProfile = async (obj) => {
	const user = store.getState().authReducer.user;
	const userProfileRef = db
		.collection("userprofiles")
		.where("uid", "==", user.uid);
	const res = await userProfileRef.get();
	const profileRef = res.docs[0].ref;
	profileRef.update(obj).catch((err) => alert(err));
};

export const updateDocument = async (obj, collection, doc) => {
	const docRef = db.collection(collection).doc(doc);
	docRef.update(obj).catch((err) => {
		alert("Oops! Something went wrong.");
	});
};

export const deleteDocument = async (collection, doc) => {
	db.collection(collection)
		.doc(doc)
		.delete()
		.catch(() => {
			alert("Oops! Something went wrong.");
		});
};

export const addImage = (image, url) => {
	const uploadImage = async (encodedImage) => {
		try {
			const res = await fetch(
				`http://localhost:5001/yelpcamp-d57d1/us-central1/widgets/newimage/${url}`,
				{
					// Your POST endpoint
					method: "POST",
					body: JSON.stringify({
						base64ImageString: encodedImage,
					}),
				}
			);
			if (res && res.status === 200) {
				return res;
			} else {
				throw new Error(res);
			}
		} catch (err) {
			const event = new CustomEvent("alert", {
				detail: `Something went wrong!`,
			});
			window.dispatchEvent(event);
		}
	};
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
					const res = await uploadImage(reader.result);
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
