import { authTypes } from "./auth.types";

export const setUser = (payload) => ({
      type: authTypes.setUser,
      payload
})
