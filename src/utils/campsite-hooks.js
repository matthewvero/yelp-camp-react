import { useEffect, useState } from "react";
import { db, storage } from "../firebase";


export function useLikeListener(campsite, user) {
      const [liked, setLiked] = useState(false);
      useEffect(() => {
		const unsub = db.collection('campsites')
		.doc(campsite.id)
		.onSnapshot(snapshot => {
			const data = snapshot.data();
			setLiked(data.likedBy.includes(user.uid))
		})
		return () => unsub();
      }, [campsite.id, user.uid])
      return liked
}

export function useGetCampsite(id) {
	const [campsite, setCampsite] = useState();
	useEffect(() => {
		const getCampsiteData = async () => {
			const campsiteRef = db.collection('campsites').doc(id);
			const campsite = await campsiteRef.get()
			setCampsite(campsite.data())
		}
		getCampsiteData()
	}, [id])
	return campsite
}

export function useCampsiteImageURLS(campsiteID) {
	const [imageURLS, setImageURLS] = useState([]);
	useEffect(() => {
		const getImageURLS = async () => {
			const storageRef = storage.ref();
			const listRef = await storageRef
			.child(`/images/${campsiteID}`)
			.listAll();
			const URLS = listRef.items.map(el => el.getDownloadURL());
			Promise.all(URLS).then(values => {
				setImageURLS(values);
			})
		};
		getImageURLS();
	}, [campsiteID]);
	return imageURLS
}