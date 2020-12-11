import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { setMenuVisibility, toggleMenu } from "../../redux/ui-redux/ui.actions";

import { HeaderButton } from "../header/header.styles";

const HeaderDropDownButton = ({ children, title, location, contains }) => {
	const menuState = useSelector(state => state.uiReducer[contains])
	
	const [prevLocation, setPrevLocation] = useState(location.path);
	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(toggleMenu(contains))
	};
	const ref = useRef();
	useEffect(() => {
		function handleClickOutside(event) {
			// Close menu when clicked outside
			menuState &&
				!ref.current.contains(event.target) &&
				dispatch(setMenuVisibility({menu: contains, visible: false}));
		}

		// Bind the event listener
		document.addEventListener("click", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("click", handleClickOutside);
		};
	}, [contains, dispatch, menuState]);

	useEffect(() => {
		setPrevLocation(location.pathname);
		prevLocation !== location.pathname && dispatch(setMenuVisibility({menu: contains, visible: false}));
	}, [contains, dispatch, location, prevLocation]);

	return (
		<HeaderButton
			onClick={handleClick}
			style={{ position: "relative" }}
			ref={ref}
		>
			{title}
			{menuState && children}
		</HeaderButton>
	);
};

export default withRouter(HeaderDropDownButton);
