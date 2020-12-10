import { combineReducers } from "redux";
import authReducer from "./auth-redux/auth.reducer";
import uiReducer from './ui-redux/ui.reducer'

export const rootReducer = combineReducers({
	authReducer: authReducer,
	uiReducer: uiReducer
});
