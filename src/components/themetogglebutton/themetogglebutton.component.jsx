import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDarkMode } from "../../utils/ui-hooks";
import { CircleButtonContainer } from "../header/header.styles";
import withTouchAnimator from "../touch-hoc/touch-hoc.component";

const ThemeToggleButton = ({ styles, ...props }) => {
	// Get dark mode from local storage and convert to boolean
	const darkMode = useDarkMode();

	const event = new Event("darkModeChanged");

	const toggleDarkMode = () => {
		localStorage.setItem("darkMode", !darkMode);
		dispatchEvent(event);
	};

	return (
		<CircleButtonContainer
			{...props}
			style={styles}
			onClick={toggleDarkMode}
		>
			<FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
		</CircleButtonContainer>
	);
};

export default withTouchAnimator(ThemeToggleButton);
