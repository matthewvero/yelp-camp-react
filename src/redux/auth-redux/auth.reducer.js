import { authTypes } from "./auth.types"

const initialState = {
      user: {},
      loggedIn: false,
      userProfile: {}
}

const authReducer = (state = initialState, { type, payload }) => {
      switch (type) {

      case authTypes.setUser:
            return { 
                  ...state, 
                  user: {...payload}
            }
      case authTypes.setUserProfile:
            return {
                  ...state,
                  userProfile: payload
            }
      case authTypes.destroySession:
      return {
            ...state,
            userProfile: {},
            user: {}
      }
      default:
            return state;
      }
}

export default authReducer;