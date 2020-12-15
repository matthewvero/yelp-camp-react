import uiTypes from './ui.types';

const initialState = {
      [uiTypes.menus.mainMenuVisible]: false,
      [uiTypes.mainMenuActiveSub]: uiTypes.subMenus.default
}

export default (state = initialState, { type, payload }) => {
      switch (type) {

      case uiTypes.toggleMenu:
            return { ...state, [payload]: !state[payload] }
      case uiTypes.setMenuVisibility:
            return { ...state, [payload.menu]: payload.visible }
      case uiTypes.setMainMenuActiveSub:
            return {...state, [uiTypes.mainMenuActiveSub]: payload}
      default:
            return state
      }
}
