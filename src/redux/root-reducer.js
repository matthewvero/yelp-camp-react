import {combineReducers} from 'redux';
import themeReducer from './theme.redux'

export const rootReducer = combineReducers({
      themeReducer: themeReducer
})