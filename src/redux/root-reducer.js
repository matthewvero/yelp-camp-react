import {combineReducers} from 'redux';
import themeReducer from './theme.redux'
import authReducer from './auth-redux/auth.reducer'

export const rootReducer = combineReducers({
      themeReducer: themeReducer, 
      authReducer: authReducer
})