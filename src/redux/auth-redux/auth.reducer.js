import { authTypes } from "./auth.types"

const initialState = {
      user: {}
}

const authReducer = (state = initialState, { type, payload }) => {
      switch (type) {

      case authTypes.setUser:
            return { 
                  ...state, 
                  user: {...payload}
            }

      default:
            return state;
      }
}

export default authReducer;