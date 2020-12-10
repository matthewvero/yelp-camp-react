import uiTypes from './ui.types';

const initialState = {
      [uiTypes.mainMenu]: false,
      [uiTypes.logInMenu]: false,
      [uiTypes.signUpMenu]: false
}

export default (state = initialState, { type, payload }) => {
      switch (type) {

      case uiTypes.toggleMenu:
            return { ...state, [payload]: !state[payload] }
      case uiTypes.setMenuVisibility:
            return { ...state, [payload.menu]: payload.visible }

      default:
            return state
      }
}
