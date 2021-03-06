import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
	CollapsibleContainer,
	CollapsibleContainerIcon,
	CollapsibleContainerTitleBar,
} from "../misc/containers.styles";
import { SectionTitle, SubTitle, Text } from "../misc/text.styles";
import { AboutSection } from "./about.styles";
import EditButton from "../editbutton/edit-button.component";
import {
	FormInputText,
	FormInputTextArea,
} from "../inputs/input-text/inputs.styles";
import Button from "../button/button.component";
import { updateUserProfile } from "../../firebase.utils";
import { withRouter } from "react-router";
const About = ({ userProfile, editable }) => {
	const theme = useContext(ThemeContext);
	const [collapsed, setCollapsed] = useState(
		window.matchMedia(`(max-width: ${theme.smallBreakPoint})`).matches
	);

	useEffect(() => {
		const windowSize = window.matchMedia(
			`(max-width: ${theme.mediumBreakPoint})`
		);
		const handleChange = (e) => {
			if (e.matches) {
				setCollapsed(true);
			} else {
				setCollapsed(false);
			}
		};
		windowSize.addEventListener("change", handleChange);
		return () => {
			windowSize.removeEventListener("change", handleChange);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Profile updates
	const [editing, setEditing] = useState(false);
	const [bioValue, setBioValue] = useState("");
	const [fromValue, setFromValue] = useState("");

	useEffect(() => {
		if (userProfile) {
			setFromValue(userProfile.from);
			setBioValue(userProfile.bio);
		}
	}, [userProfile]);

	const handleUpdate = () => {
		if (
			bioValue !== userProfile.bio ||
			fromValue !== userProfile.from
		) {
			updateUserProfile({
				...userProfile,
				bio: bioValue,
				from: fromValue,
			})
				.then(() => {
					setEditing(false);
				})
				.catch((err) => alert(err));
		}
	};

	return (
		<CollapsibleContainer
			style={{
				width: "100%",
				alignItems: "start",
				padding: "20px",
				justifyContent: "start",
				color: theme.textAlt,
				position: "relative",
				paddingBottom: editing ? "70px" : "20px",
			}}
			collapsed={collapsed}
		>
			<CollapsibleContainerTitleBar
				onClick={() => setCollapsed((collapsed) => !collapsed)}
			>
				<SubTitle>About</SubTitle>
				<CollapsibleContainerIcon
					icon={faChevronDown}
					collapsed={collapsed ? 1 : 0}
				/>
			</CollapsibleContainerTitleBar>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					justifyContent: "start",
					width: "100%",
					height: "100%",
				}}
			>
				<AboutSection>
					<SectionTitle style={{ marginRight: "5px" }}>
						From:
					</SectionTitle>
					{editing ? (
						<FormInputText
							placeholder="Nothing Here"
							autoFocus
							style={{
								padding: "5px",
								marginLeft: "10px",
							}}
							value={fromValue}
							onChange={(e) =>
								setFromValue(e.target.value)
							}
						/>
					) : (
						<Text
							style={{
								color: userProfile.from
									? theme.textAlt
									: "#666666",
							}}
						>
							{userProfile.from
								? userProfile.from
								: "Nothing Here"}
						</Text>
					)}
				</AboutSection>
				<SectionTitle
					style={{
						margin: "5px 0",
					}}
				>
					Bio:
				</SectionTitle>
				<div
					style={{
						display: "flex",
						alignItems: "start",
						height: "auto",
						minHeight: "50px",
						width: "100%",
					}}
				>
					{editing ? (
						<FormInputTextArea
							style={{
								width: "100%",
								padding: "5px",
							}}
							placeholder="Tell us about yourself"
							value={bioValue}
							onChange={(e) =>
								setBioValue(e.target.value)
							}
						/>
					) : (
						<Text>
							{userProfile.bio
								? userProfile.bio
								: "Tell people about yourself"}
						</Text>
					)}
				</div>

				{editable && !collapsed && (
					<div
						style={{
							position: "absolute",
							right: "20px",
							bottom: "20px",
							display: "flex",
							alignItems: "center",
						}}
					>
						{editing && (
							<Button
								style={{
									backgroundColor:
										theme.color,
									padding: "5px",
									marginRight: "10px",
								}}
								fn={handleUpdate}
							>
								Update
							</Button>
						)}
						<EditButton
							editing={editing}
							style={{ fontSize: "1.5rem" }}
							fn={() => setEditing(!editing)}
						/>
					</div>
				)}
			</div>
		</CollapsibleContainer>
	);
};

export default withRouter(About);
