import firebase from "firebase/app";
import { db, storage, auth } from "./firebase";
import store from "./redux/store";
import { destroySession } from "./redux/auth-redux/auth.actions";

// CAMPSITE UTILITIES
const storageRef = storage.ref();

export const getUserCampsites = (setCamps, userID) => {
		const campsites = db
			.collection("campsites")
			.where("owner", "==", userID); // Need to load campsites in chronological order

		const unsub = campsites.onSnapshot((snapshot) => {
			let campsitesArr = [];
			snapshot.forEach((el) => {
				campsitesArr.push(el.data());
			});
			setCamps(campsitesArr);
		});

		return unsub;
};

export const addCampsite = async ({ campsite, image }) => {
	const user = store.getState().authReducer.user;
	if (user.uid) {
		// Add created date
		const timestamp = firebase.firestore.FieldValue.serverTimestamp;

		// Create reference for new camp to get random ID
		const newCampsite = db.collection("campsites").doc();
		const newCampsiteRef = await newCampsite.get();

		// Upload image to folder under campsite ID
		const {uploadTask, imageRef} = addCampsiteImage(newCampsiteRef, image);

		// On completion of image upload write data to firestore
		uploadTask.on("state_change", undefined, undefined, async () => {
			db.collection("campsites")
				.doc(newCampsiteRef.id)
				.set({
					...campsite,
					createdAt: timestamp(),
					likedBy: [],
					// Insert ID inside new doc so that it can be used later.
					id: newCampsiteRef.id,
				})
				.catch(() => {
					// Remove image if document write fails
					imageRef.delete();
					alert('Something went wrong');
				})
		});
		// Return uploadTask so that progress can be tracked
		return { uploadTask };
	} else {
		alert("You need to be logged in to do that.");
	}
};

function addCampsiteImage(newCampsiteRef, image) {
	const imageRef = storageRef.child(
		`images/${newCampsiteRef.id}/${image.size}`
	);

	const uploadTask = imageRef.put(image);
	return {uploadTask, imageRef};
};

export const updateCampsite = async (campsite, key, value) => {
	const user = store.getState().authReducer.user;
	if (campsite.owner === user.uid) {
		const campsiteRef = db.collection("campsites").doc(campsite.id);
		const res = await campsiteRef.update({ [key]: value });
		return res;
	}
};

export const likeCampsite = async (campsiteID, userID, liked) => {
	if (userID){
		const campsiteRef = db.collection('campsites').doc(campsiteID);
		liked ?

			campsiteRef.update({
				likedBy: firebase.firestore.FieldValue.arrayRemove(userID)
			})
			.catch(err => alert('Something Went Wrong'))
		: 
			campsiteRef.update({
				likedBy: firebase.firestore.FieldValue.arrayUnion(userID)
			}).catch(err => alert('Something Went Wrong'))
			
	} else {
		alert('You need to be signed in to do that')
	}
}

// COMMENT UTILITIES

export const addComment = async (userID, comment, campsiteID) => {
	if (userID) {
		const data = {
			user: userID,
			comment,
			campsiteID
		}
		const commentRef = db.collection('comments');
		commentRef.add(data)
	} else {
		alert('You need to be signed in to do that')
	}
}

// USER UTILITIES

export function logOut(history) {
	console.log("clicked");
	auth.signOut();
	store.dispatch(destroySession());
	history.push("/home");
}

export const addProfileImage = (image, imageType) => {
	const user = store.getState().authReducer.user;
	if (user.uid) {
		const imageRef = storageRef.child(
			`profiles/${user.uid}/${imageType}/${image.size}`
		);

		const uploadTask = imageRef.put(image);

		return uploadTask;
	} else {
		alert("You need to be logged in to do that.");
	}
};

export const getUserImages = async (imageType, uid) => {
	if (uid) {
		const imagesRef = storageRef.child(`profiles/${uid}/${imageType}`);
		const list = await imagesRef.listAll();

		const getDownloadURL = (item) => {
			return new Promise((resolve, reject) => {
				resolve(item.getDownloadURL());
				reject((err) => console.log(err));
			});
		};
		const populateUrlArray = async (list) => {
			return Promise.all(
				list.items.map((item) => getDownloadURL(item))
			);
		};

		const URLs = populateUrlArray(list);

		return URLs;
	}
	return [];
};

export const updateUserProfile = async (obj) => {
	const user = store.getState().authReducer.user;
	const campsiteRef = db.collection("userProfiles").doc(user.uid);
	const res = await campsiteRef.update(obj);
	return res;
};
