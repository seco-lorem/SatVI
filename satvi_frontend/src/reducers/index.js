import {combineReducers} from 'redux';
import ActiveUserReducer from './reduce-userdata';


/**
 * I(seco) created this file in hopes of properly structuring redux in this project
 * I had failed that time and this is not in use.
 * Even though I understad it now, I haven't bothered to change it to this way.
 */

const allReducers = combineReducers({
    activeUser: ActiveUserReducer
});

export default allReducers