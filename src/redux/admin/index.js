import { combineReducers } from 'redux'
import authReducer from './authReducer'
import pages from './pages'

export default combineReducers({
   authReducer,
   pages
});
