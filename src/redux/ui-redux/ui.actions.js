import uiTypes from "./ui.types";

export const toggleMenu = (payload) => ({
	type: uiTypes.toggleMenu,
	payload,
});

export const setMenuVisibility = (payload) => ({
	type: uiTypes.setMenuVisibility,
	payload,
});

export const setMainMenuSubMenu = (payload) => ({
	type: uiTypes.setMainMenuActiveSub,
	payload,
});

export const setImageViewerArr = (payload) => ({
	type: uiTypes.setImageViewerArr,
	payload,
});

export const setLoading = (payload) => ({
	type: uiTypes.setLoading,
	payload,
});
