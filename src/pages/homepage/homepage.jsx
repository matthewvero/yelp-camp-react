import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { ResponsivePageContainer } from "../../components/misc/containers.styles";
import { PageContainer } from "../page.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
	FormInputLabel,
	FormInputText,
} from "../../components/inputs/input-text/inputs.styles";
import CampsiteCard from "../../components/campsitecard/campsite-card.component";
import { db } from "../../firebase";
import {
	HomePageCardsGrid,
	HomepageHeadingContainer,
	SearchBarContainer,
} from "./homepage.styles";
import { Text, Title } from "../../components/misc/text.styles";

const formStyles = {
	position: "relative",
	height: "100%",
	display: "flex",
	alignItems: "center",
};

const Homepage = () => {
	const themeContext = useContext(ThemeContext);
	const [campsites, setCampsites] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchFocus, setSearchFocus] = useState(false);
	useEffect(() => {
		const getData = async () => {
			let campsitesArr = [];
			const snapshot = await db.collection("campsites").get();
			snapshot.forEach((doc) =>
				campsitesArr.push({ data: doc.data(), id: doc.id })
			);
			setCampsites(campsitesArr);
		};
		getData();
	}, []);

	useEffect(() => {
		setSearchResults(campsites);
	}, [campsites]);

	const handleChange = (event) => {
		const input = event.target.value;
		const newCampsiteArr = campsites.filter(
			(el) =>
				el.data.title
					.toLowerCase()
					.includes(input.toLowerCase()) ||
				el.data.description
					.toLowerCase()
					.includes(input.toLowerCase())
		);
		setSearchResults(newCampsiteArr);
	};

	return (
		<PageContainer>
			<ResponsivePageContainer
				style={{
					marginTop: "10px",
				}}
			>
				<HomepageHeadingContainer>
					<Title
						style={{
							fontSize: "2.5rem",
							fontWeight: "400",
							color: themeContext.textAlt,
							margin: "0",
						}}
					>
						Welcome To YelpCamp!{" "}
						<FontAwesomeIcon
							style={{ color: themeContext.color }}
							icon={faMountain}
						/>
					</Title>
				</HomepageHeadingContainer>

				<SearchBarContainer>
					<Text>Our most popular Campsites!</Text>

					<div style={formStyles}>
						<FormInputLabel
							htmlFor="searchcampsites"
							$focus={searchFocus}
						>
							Search Campsites
						</FormInputLabel>
						<FontAwesomeIcon
							icon={faSearch}
							style={{
								position: "absolute",
								left: "5%",
								color: themeContext.textAlt,
							}}
						/>

						<FormInputText
							style={{ height: "70%" }}
							onChange={(e) => handleChange(e)}
							id="searchcampsites"
							onFocus={() => setSearchFocus(true)}
							onBlur={() => setSearchFocus(false)}
						/>
					</div>
				</SearchBarContainer>

				<HomePageCardsGrid>
					{searchResults.map((site) => (
						<CampsiteCard
							campsite={site.data}
							key={site.id}
						/>
					))}
				</HomePageCardsGrid>
			</ResponsivePageContainer>
		</PageContainer>
	);
};

export default Homepage;
