import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { addCampsite } from "../../firebase.utils";
import { CSSTransition } from "react-transition-group";
import { CCContainer } from "./campsite-creator.styles";
import {
	CCCreate,
	CCReview,
	CCStart,
} from "./campsite-creator-pages";

const CampsiteCreator = () => {
	const [activePage, setActivePage] = useState("start");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState();
	const [price, setPrice] = useState("");
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.authReducer.user);
	const refs = {
		start: React.createRef(),
		create: React.createRef(),
		review: React.createRef()
	}
	const handleConfirm = () => {
		title && description && price && image
			? setActivePage("review")
			: alert("Please fill out all inputs before proceeding.");
	};

	const handleReset = () => {
		setActivePage("start");
		setTitle("");
		setDescription("");
		setPrice("");
		setImage();
		setPreviewImage();
		setProgress();
		setLoading(false);
	};

	const handleBack = () => {
		setActivePage("create");
	};

	const handleSubmit = async () => {
		setLoading(true);
		const campsite = {
			title: title,
			description: description,
			price: price,
			owner: user.uid,
		};
		const res = await addCampsite({ campsite: campsite, image: image });
		
		res.uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred /
						snapshot.totalBytes) *
					100;
				setProgress(progress);
			},
			(error) => alert(error),
			() => {
				handleReset();
			}
		);
	};

	const api = {
		activePage,
		setActivePage,
		title,
		setTitle,
		description,
		setDescription,
		price,
		setPrice,
		image,
		setImage,
		previewImage,
		setPreviewImage,
		progress,
		setProgress,
		loading,
		setLoading,
		handleBack,
		handleReset,
		handleConfirm,
		handleSubmit,
		refs
	};

	return (
		<CCContainer
			style={{
				width: "100%",
				marginBottom: "10px",
			}}
			activePage={activePage}
		>
			<CreatorAPI.Provider value={api}>
				<CSSTransition
					in={activePage === "start"}
					classNames="page"
					timeout={200}
					unmountOnExit
					nodeRef={refs.start}
				>
					<CCStart />
				</CSSTransition>
				<CSSTransition
					in={activePage === "create"}
					classNames="page"
					timeout={200}
					unmountOnExit
					nodeRef={refs.create}
				>
					<CCCreate />
				</CSSTransition>
				<CSSTransition
					in={activePage === "review"}
					classNames="page"
					timeout={200}
					unmountOnExit
					nodeRef={refs.review}
				>
					<CCReview />
				</CSSTransition>
			</CreatorAPI.Provider>
		</CCContainer>
	);
};

export const CreatorAPI = createContext(null);

export default CampsiteCreator;
