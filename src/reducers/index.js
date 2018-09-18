import {combineReducers} from 'redux';
import restuarantReducer from './restuarantReducer';

export default combineReducers({
    restuarants:restuarantReducer, 
});
