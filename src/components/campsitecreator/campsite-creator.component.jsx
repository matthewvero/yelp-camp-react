import React, { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { addCampsite } from "../../firebase.utils";
import { CSSTransition } from "react-transition-group";
import { CCContainer } from "./campsite-creator.styles";
import { CCCreate, CCReview, CCStart } from "./campsite-creator-pages";

const CampsiteCreator = () => {
	const ccPages = {
		start: "START",
		create: "CREATE",
		review: "REVIEW",
	};
	const [activePage, setActivePage] = useState(ccPages.start);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState();
	const [price, setPrice] = useState("");
	const [image, setImage] = useState();
	const [previewImage, setPreviewImage] = useState();
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.authReducer.user);
	const refs = {
		start: React.createRef(),
		create: React.createRef(),
		review: React.createRef(),
	};
	const handleConfirm = () => {
		title && description && price && image
			? setActivePage(ccPages.review)
			: alert("Please fill out all inputs before proceeding.");
	};

	const handleReset = () => {
		setActivePage(ccPages.start);
		setTitle("");
		setDescription("");
		setPrice("");
		setImage();
		setPreviewImage();
		setLoading(false);
	};

	const handleBack = () => {
		setActivePage(ccPages.create);
	};

	const handleSubmit = async () => {
		setLoading(true);
		const campsite = {
			title: title,
			description: description,
			price: price,
			owner: user.uid,
		};
		try {
			const res = await addCampsite({
				campsite: campsite,
				image: image,
			});
			if (res.status === 200) {
				const event = new CustomEvent("alert", {
					detail: `Campsite Created`,
				});
				window.dispatchEvent(event);
			}
		} catch (err) {
			const event = new CustomEvent("alert", {
				detail: `Something went wrong! ${err.message}`,
			});
			window.dispatchEvent(event);
		} finally {
			handleReset();
		}
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
		setLoading,
		handleBack,
		handleReset,
		handleConfirm,
		handleSubmit,
		refs,
		loading,
		ccPages,
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
					in={activePage === ccPages.start}
					classNames="page"
					timeout={200}
					unmountOnExit
					nodeRef={refs.start}
				>
					<CCStart />
				</CSSTransition>
				<CSSTransition
					in={activePage === ccPages.create}
					classNames="page"
					timeout={200}
					unmountOnExit
					nodeRef={refs.create}
				>
					<CCCreate />
				</CSSTransition>
				<CSSTransition
					in={activePage === ccPages.review}
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
