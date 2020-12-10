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
	CCInput,
	CCPage,
	CCTextArea,
	StartPageTitle,
} from "./campsite-creator.styles";
import { CreatorAPI } from "./campsite-creator.component";
import InputImage from "../inputs/input-image/input-image.component";
import { SubTitle, Text } from "../misc/text.styles";

export const CCStart = () => {
	// Access the CC hooks and state
	const api = useContext(CreatorAPI);
	const themeContext = useContext(ThemeContext);
	return (
		<CCPage
			onClick={() => api.setActivePage("create")}
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
		<CCPage style={{ padding: "0" }}>
			<CCGrid>
				{image === undefined ? (
					<CCImageInput htmlFor="image">
						<FontAwesomeIcon
							icon={faCamera}
							style={{ fontSize: "3rem" }}
						/>
					</CCImageInput>
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

				<CCInput
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<CCInput
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
					<CCButton
						onClick={() => handleReset()}
					>
						<FontAwesomeIcon
							style={{ color: "red" }}
							icon={faChevronLeft}
						/>{" "}
						Cancel
					</CCButton>
					<CCButton
						onClick={() => handleConfirm()}
					>
						Review{" "}
						<FontAwesomeIcon
							style={{ color: themeContext.color }}
							icon={faChevronRight}
						/>
					</CCButton>
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
		<CCPage>
			{!loading ? (
				<div
					style={{
						height: "100%",
						padding: "10px",
						boxSizing: "border-box",
						width: "100%",
						display: "grid",
						gridTemplateColumns: "minmax(213px, 25%) auto 20%",
						gridTemplateRows: "30% auto",
						gap: "1rem",
					}}
				>
					<div
						style={{
							gridRow: "1 / 3",
							borderRadius: "10px",
							overflow: "hidden",
						}}
					>
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
					</div>

					<SubTitle
						style={{
							gridColumn: "2/3",
							textAlign: "left",
							margin: 'auto 0'
						}}
					>
						{title}
					</SubTitle>

					<div
						style={{
							gridColumn: "2/3",
							gridRow: "2/3",
							overflow: "scroll",
						}}
					>
						<Text
							style={{
								textAlign: "left",
							}}
						>
							{description}
						</Text>
					</div>

					<SubTitle
						style={{
							color: themeContext.color,
							alignSelf: "start",
							margin: 'auto 0'
						}}
					>
						£{price} /Night
					</SubTitle>

					<CCButtonContainer>
						<CCButton
							onClick={() => handleBack()}
						>
							<FontAwesomeIcon
								style={{ color: "red" }}
								icon={faChevronLeft}
							/>{" "}
							Go back
						</CCButton>
						<CCButton
							onClick={() => handleSubmit()}
						>
							Create{" "}
							<FontAwesomeIcon
								style={{
									color: themeContext.color,
								}}
								icon={faChevronRight}
							/>
						</CCButton>
					</CCButtonContainer>
				</div>
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
