import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase";
import { getUserImages, getUserProfile } from "../firebase.utils";
import { setUser, setUserProfile } from "../redux/auth-redux/auth.actions";

export function useAuthListener() {
	const dispatch = useDispatch();
	useEffect(() => {
		auth.onAuthStateChanged(function (user) {
			if (user) {
				const getImages = async () => {
					const profileImageURLs = await getUserImages(
						"profileImages",
						user.uid
					);
					const coverImageURLs = await getUserImages(
						"coverImages",
						user.uid
					);
					getUserProfile(user.uid)
						.then((userProfile) => {
							dispatch(
								setUserProfile({
									displayName:
										user.displayName,
									profilePicture: profileImageURLs,
									coverImages: coverImageURLs,
									...userProfile,
								})
							);
						})
						.catch((err) =>
							alert("Error Fetching profile")
						);
				};
				getImages();
				dispatch(setUser(user));
			}
		});
	}, [dispatch]);
}

export function useGetUsername(userID) {
	const [username, setUsername] = useState();
	useEffect(() => {
		if (userID) {
			const getUsername = async () => {
				db.collection("userProfiles")
					.where("userID", "==", userID)
					.get()
					.then((query) => {
						query &&
							setUsername(
								query.docs[0].data().displayName
							);
					})
					.catch((err) => {
						console.log(err);
					});
			};
			getUsername();
		}
	}, [userID]);
	return username;
}
