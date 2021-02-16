import {
	faCamera,
	faChevronLeft,
	faChevronRight,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import ProgressIndicator from "../progressindicator/progressindicator.component";
import {
	CCButton,
	CCButtonContainer,
	CCGrid,
	CCHoverEffect,
	CCImageContainer,
	CCImageInput,
	CCTitleInput,
	CCPage,
	CCPriceInput,
	CCTextArea,
	StartPageTitle,
	CCReviewGrid,
	CCReviewButtonContainer,
	CCReviewImageContainer,
	CCReviewButton
} from "./campsite-creator.styles";
import { CreatorAPI } from "./campsite-creator.component";
import InputImage from "../inputs/input-image/input-image.component";
import { SubTitle } from "../misc/text.styles";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";
import Image from "../image/image.component";
import { CampsiteCardLongPriceContainer, CampsiteCardLongSubText, CampsiteCardLongTextContainer, CampsiteCardLongTitle } from "../campsitecardlong/campsite-card-long.styles";

const CCImageInputTouch = withTouchAnimator(CCImageInput)
const CCButtonTouch = withTouchAnimator(CCButton)

export const CCStart = () => {
	// Access the CC hooks and state
	const api = useContext(CreatorAPI);
	const themeContext = useContext(ThemeContext);
	return (
		<CCPage
			onClick={() => api.setActivePage("create")}
			ref={api.refs.start}
		>
			<CCHoverEffect>
				<StartPageTitle>
					<SubTitle>Create New Campsite</SubTitle>
					<FontAwesomeIcon
						style={{ color: themeContext.color }}
						icon={faPlus}
					/>
				</StartPageTitle>
			</CCHoverEffect>
		</CCPage>
	);
};

export const CCCreate = () => {
	// Access the cC hooks and state
	const api = useContext(CreatorAPI);
	const {
		handleReset,
		handleConfirm,
		previewImage,
		setPreviewImage,
		image,
		setImage,
		title,
		setTitle,
		price,
		setPrice,
		description,
		setDescription,
	} = api;
	const themeContext = useContext(ThemeContext);
	return (
		<CCPage style={{ padding: "0" }} ref={api.refs.create}>
			<CCGrid>
				{image === undefined ? (
							
					<CCImageInputTouch
						htmlFor="image"
						
					>
						<FontAwesomeIcon
							icon={faCamera}
							style={{ fontSize: "3rem" }}
						/>
					</CCImageInputTouch>
							
					
				) : (
					<CCImageContainer>
						<img
							style={{
								height: "100%",
								width: "100%",
								borderRadius: "10px",
								overflow: "hidden",
							}}
							alt="Your campground"
							src={previewImage}
						/>
					</CCImageContainer>
				)}

				<InputImage
					id="image"
					setImageFn={setImage}
					setPreviewImageFn={setPreviewImage}
				/>

				<CCTitleInput
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<CCPriceInput
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					min="0"
					step="5"
				/>

				<CCTextArea
					rows="3"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<CCButtonContainer >
						<CCButtonTouch
							onClick={() => handleReset()}
						>
							<FontAwesomeIcon
								style={{ color: "red" }}
								icon={faChevronLeft}
							/>{" "}
							Cancel
						</CCButtonTouch>
					
						<CCButtonTouch
							onClick={() => handleConfirm()}
						>
							Review{" "}
							<FontAwesomeIcon
								style={{ color: themeContext.color }}
								icon={faChevronRight}
							/>
						</CCButtonTouch>
				</CCButtonContainer>
			</CCGrid>
		</CCPage>
	);
};

export const CCReview = () => {
	const api = useContext(CreatorAPI);
	const {
		loading,
		previewImage,
		description,
		handleBack,
		handleSubmit,
		price,
		progress,
		title,
	} = api;
	const themeContext = useContext(ThemeContext);
	return (
		<CCPage ref={api.refs.review}>
			{!loading ? (
				<CCReviewGrid>
					<CCReviewImageContainer>
						<Image image={previewImage} />
					</CCReviewImageContainer>

					<CampsiteCardLongTextContainer>
						<CampsiteCardLongTitle>{title}</CampsiteCardLongTitle>
						<CampsiteCardLongSubText>{description}</CampsiteCardLongSubText>
					</CampsiteCardLongTextContainer>
					<CampsiteCardLongPriceContainer>
						<CampsiteCardLongSubText style={{color: themeContext.color}}>{price}/ Night</CampsiteCardLongSubText>
					</CampsiteCardLongPriceContainer>
					<CCReviewButtonContainer>
						<CCReviewButton
							onClick={() => handleBack()}
						>
							<FontAwesomeIcon
								style={{ color: "red" }}
								icon={faChevronLeft}
							/>{" "}
							Go back
						</CCReviewButton>
						<CCReviewButton
							onClick={() => handleSubmit()}
						>
							Create{" "}
							<FontAwesomeIcon
								style={{
									color: themeContext.color,
								}}
								icon={faChevronRight}
							/>
						</CCReviewButton>
					</CCReviewButtonContainer>
				</CCReviewGrid>
			) : (
				<ProgressIndicator
					size={120}
					radius={52}
					percent={progress}
				/>
			)}
		</CCPage>
	);
};
