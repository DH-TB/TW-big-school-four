import {combineReducers} from 'redux';
import receipt from './receipt';
import item from './item';

export default combineReducers({
    receipt,
    item
})