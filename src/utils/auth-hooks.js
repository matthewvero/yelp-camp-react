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
					.doc(user.uid)
					.onSnapshot((snapshot) => {
						dispatch(setUserProfile(snapshot.data()));
					});
			}
			dispatch(setUser(user));
		});
		return () => {
			unsub();
		};
	}, [dispatch]);
}
// Change
export function useProfileListener(userID) {
	const [userProfile, setUserProfile] = useState({});
	useEffect(() => {
		const unsub = db
			.collection("userprofiles")
			.doc(userID)
			.onSnapshot((snapshot) => {
				setUserProfile(snapshot.data());
			});
		return () => {
			unsub();
		};
	}, [userID]);
	return userProfile;
}
// FIX THIS
export function useGetUsername(userID) {
	const [username, setUsername] = useState();
	const user = useSelector((state) => state.authReducer.user);
	useEffect(() => {
		if (userID && userID === user.uid) {
			console.log(user);
			setUsername(user.displayName);
		} else if (userID) {
			const getUsername = async () => {
				try {
					const res = await db
						.collection("userprofiles")
						.doc(userID)
						.get();
					setUsername(res.data().displayName);
				} catch (err) {
					alert("Problem getting username: " + err);
				}
			};
			getUsername();
		}
	}, [user, user.displayName, user.uid, userID]);
	return username;
}
