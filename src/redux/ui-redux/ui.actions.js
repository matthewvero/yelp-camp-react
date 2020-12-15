import uiTypes from "./ui.types";

export const toggleMenu = (payload) => ({
	type: uiTypes.toggleMenu,
	payload: payload
});

export const setMenuVisibility = (payload) => ({
	type: uiTypes.setMenuVisibility,
	payload: payload
})

export const setMainMenuSubMenu = (payload) => ({
	type: uiTypes.setMainMenuActiveSub,
	payload: payload
})