import { authTypes } from "./auth.types";

export const setUser = (payload) => ({
      type: authTypes.setUser,
      payload
})

export const setUserProfile = (payload) => ({
      type: authTypes.setUserProfile,
      payload
})