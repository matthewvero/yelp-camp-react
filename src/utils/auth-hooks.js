import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";

import { setUser, setUserProfile } from "../redux/auth-redux/auth.actions";

export function useAuthListener() {
	const dispatch = useDispatch();
	useEffect(() => {
		let unsub;
		auth.onAuthStateChanged((user) => {
			if (user) {
				unsub = db
					.collection("userprofiles")
					.where("uid", "==", user.uid)
					.onSnapshot((snapshot) => {
						dispatch(
							setUserProfile(
								snapshot.docs[0].data()
							)
						);
					});
			}
			dispatch(setUser(user));
		});
		return () => {
			unsub();
		};
	}, [dispatch]);
}

export function useProfileListener(userID) {
	const [userProfile, setUserProfile] = useState({});
	useEffect(() => {
		const unsub = db
			.collection("userprofiles")
			.where("uid", "==", userID)
			.onSnapshot((snapshot) => {
				setUserProfile(snapshot.docs[0].data());
			});
		return () => {
			unsub();
		};
	}, [userID]);
	return userProfile;
}

export function useGetUsername(userID) {
	const [username, setUsername] = useState();
	const user = useSelector((state) => state.authReducer.user);
	useEffect(() => {
		if (userID && userID === user.uid) {
			setUsername(user.displayName);
		} else if (userID) {
			const getUsername = async () => {
				db.collection("userprofiles")
					.where("uid", "==", userID)
					.get()
					.then((query) => {
						query &&
							query.docs.length &&
							setUsername(
								query.docs[0].data().displayname
							);
					})
					.catch((err) => {
						alert("Problem getting username: " + err);
					});
			};
			getUsername();
		}
	}, [user.displayName, user.uid, userID]);
	return username;
}
