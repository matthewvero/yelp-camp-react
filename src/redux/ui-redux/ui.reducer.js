import uiTypes from "./ui.types";

const initialState = {
	[uiTypes.menus.mainMenuVisible]: false,
	[uiTypes.mainMenuActiveSub]: uiTypes.subMenus.default,
	[uiTypes.profileImages]: [],
	[uiTypes.imageViewerArr]: [],
};

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case uiTypes.toggleMenu:
			return { ...state, [payload]: !state[payload] };
		case uiTypes.setMenuVisibility:
			return { ...state, [payload.menu]: payload.visible };
		case uiTypes.setMainMenuActiveSub:
			return { ...state, [uiTypes.mainMenuActiveSub]: payload };
		case uiTypes.setImageViewerArr:
			return { ...state, [uiTypes.imageViewerArr]: payload };
		default:
			return state;
	}
};

export default uiReducer;
