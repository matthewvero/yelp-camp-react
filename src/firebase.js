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
    // Add created date
    const data = {
        ...campsite,
        dateCreated: firebase.firestore.Timestamp.now()
    }

    // Create reference for new camp to get random ID
    const newCampsite = db.collection('campsites').doc()
    const newCampsiteRef = await newCampsite.get()

    // Upload image to folder under campsite ID
    const imageRef = storageRef.child(`images/${newCampsiteRef.id}/${image.size}`)
    
    const uploadTask = imageRef.put(image)
    
    uploadTask.on('state_change', undefined, undefined, () => {
        updateCampsite(newCampsiteRef.id, data)
    })
    
    // Return uploadTask so that progress can be tracked
    return {uploadTask}
}

const updateCampsite = async (campsiteID, data) => {
    db.collection('campsites').doc(campsiteID).set({
        // Insert random ref inside new doc so that it can be referenced later.
        ...data,
        id: campsiteID,
        
    })
}