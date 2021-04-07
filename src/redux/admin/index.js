import { combineReducers } from 'redux'
import authReducer from './authReducer'
import pages from './pages'
import fireBaseData from './fireBaseData'

export default combineReducers({
   authReducer,
   pages,
   fireBaseData
});
