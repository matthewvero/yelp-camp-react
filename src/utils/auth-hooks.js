import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { getUserImages } from "../firebase.utils";
import { setUser, setUserProfile } from "../redux/auth-redux/auth.actions";



export function useAuthListener() {
      const dispatch = useDispatch();
      useEffect(() => {
		auth.onAuthStateChanged(function (user) {

			if (user) {
				const getImages = async () => {
					const profileImageURLs = await getUserImages("profileImages", user.uid);
					const coverImageURLs = await getUserImages("coverImages", user.uid);
					dispatch(setUserProfile({
						displayName: user.displayName, 
						profilePicture: profileImageURLs, 
						coverImages: coverImageURLs
					}))
				};
				getImages();
				dispatch(setUser(user));
			}
		});
	}, [dispatch]);

}