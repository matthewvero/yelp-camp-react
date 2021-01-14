import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDarkMode } from "../../utils/ui-hooks";
import { CircleButtonContainer } from "../header/header.styles";

const ThemeToggleButton = (styles) => {
	// Get dark mode from local storage and convert to boolean
	const darkMode = useDarkMode();

	const event = new Event("darkModeChanged");

	const toggleDarkMode = () => {
		localStorage.setItem("darkMode", !darkMode);
		dispatchEvent(event);
	};

	return (
		<CircleButtonContainer style={styles} onClick={toggleDarkMode}>
			<FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
		</CircleButtonContainer>
	);
};

export default ThemeToggleButton;
