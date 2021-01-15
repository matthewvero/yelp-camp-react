import React from "react";
import Button from "../../components/button/button.component";
import { faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LandingPageContainer } from "./landingpage.styles";
import BackgroundCarousel from "../../components/backgroundcarousel/backgroundcarousel.component";

const LandingPage = ({ history }) => {
	return (
		<LandingPageContainer>
			<BackgroundCarousel />
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
				<Button fn={() => history.push("home")} style={{padding: '10px'}}>
					View Campsites
				</Button>
			</div>
		</LandingPageContainer>
	);
};

export default LandingPage;
