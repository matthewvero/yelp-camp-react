import { combineReducers } from "redux";
import authReducer from "./auth-redux/auth.reducer";

export const rootReducer = combineReducers({
	authReducer: authReducer,
});
