import React from "react";
import Button from "../../components/button/button.component";
import ImageCarousel from "../../components/imagecarousel/imagecarousel.component";
import { faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LandingPageContainer } from "./landingpage.styles";

const LandingPage = ({ history }) => {
	return (
		<LandingPageContainer>
			<ImageCarousel />
			<div
				style={{
					position: "absolute",
					zIndex: "1",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					padding: "20px",
					borderRadius: "15px",
					backdropFilter: 'blur(10px)'
				}}
			>
				<h1 style={{ color: "white", fontSize: "3rem" }}>
					Welcome To YelpCamp{" "}
					<FontAwesomeIcon icon={faMountain} />
				</h1>
				<Button fn={() => history.push("home")} styles={{padding: '10px'}}>
					View Campsites
				</Button>
			</div>
		</LandingPageContainer>
	);
};

export default LandingPage;
