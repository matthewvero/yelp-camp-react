import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getReviews } from "../firebase.utils";

export function useLikeListener(campsite, user) {
	const [liked, setLiked] = useState(false);
	const [likedBy, setLikedBy] = useState([]);
	useEffect(() => {
		if (campsite.hasOwnProperty("uid")) {
			const unsub = db
				.collection("campsites")
				.doc(campsite.uid)
				.onSnapshot((snapshot) => {
					const data = snapshot.data();
					setLikedBy(data.likedBy);
					user && setLiked(data.likedBy.includes(user.uid));
				});
			return () => unsub();
		}
	}, [campsite, user]);
	return { liked, likedBy };
}

export function useReviewListener(campsiteID) {
	const [reviews, setReviews] = useState();
	useEffect(() => {
		let unsub;
		const getReviews = async (campsiteID) => {
			unsub = db
				.collection("reviews")
				.where("campsiteID", "==", campsiteID)
				.onSnapshot((snapshot) => {
					setReviews(snapshot.docs.map((el) => el.data()));
				});
		};
		getReviews(campsiteID);
		return () => {
			unsub();
		};
	}, [campsiteID]);
	return reviews;
}

export function useRatingCalculator(campsiteID) {
	const [averageRating, setAverageRating] = useState(0);
	const [reviewCount, setReviewCount] = useState(0);
	useEffect(() => {
		const getMeanRatings = async () => {
			const reviews = await getReviews(campsiteID);
			if (reviews.length === 0) {
				return 0;
			}
			const sumRatings = reviews.reduce((sum, next) => {
				return (sum += Object.keys(next.ratings).reduce(
					(cur, acc) => {
						return (cur += next.ratings[acc]);
					},
					0
				));
			}, 0);

			setAverageRating(sumRatings / (reviews.length * 6));
			setReviewCount(reviews.length);
		};
		getMeanRatings();
	}, [campsiteID]);
	return { averageRating, reviewCount };
}
