import fb from "firebase/app";
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: "AIzaSyCsZdFdrJ7-NXJ7EtvfzfagzCUWJg_dQ3k",
	authDomain: "yelpcamp-d57d1.firebaseapp.com",
	databaseURL: "https://yelpcamp-d57d1.firebaseio.com",
	projectId: "yelpcamp-d57d1",
	storageBucket: "yelpcamp-d57d1.appspot.com",
	messagingSenderId: "1027368373956",
	appId: "1:1027368373956:web:abebd71e48a70c39fc8391",
	measurementId: "G-PTGPMK19NR",
};
// Initialize Firebase
const firebase = fb.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();

export default firebase;