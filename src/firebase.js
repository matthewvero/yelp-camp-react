import firebase from "firebase";

var firebaseConfig = {
      apiKey: "AIzaSyCsZdFdrJ7-NXJ7EtvfzfagzCUWJg_dQ3k",
      authDomain: "yelpcamp-d57d1.firebaseapp.com",
      databaseURL: "https://yelpcamp-d57d1.firebaseio.com",
      projectId: "yelpcamp-d57d1",
      storageBucket: "yelpcamp-d57d1.appspot.com",
      messagingSenderId: "1027368373956",
      appId: "1:1027368373956:web:abebd71e48a70c39fc8391",
      measurementId: "G-PTGPMK19NR"
};
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();

const storageRef = storage.ref()


export const addCampsite = async ({campsite, image}) => {
    const data = {
        ...campsite,
        dateCreated: firebase.firestore.Timestamp.now()
    }
    
    const res = await db.collection('campsites').add(data);

    const imageRef = storageRef.child(`images/${res.id}/${image.size}`)

    const uploadTask = imageRef.put(image)

    return {res, uploadTask}
}