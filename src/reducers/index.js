import { combineReducers } from 'redux';
import counter from './counterReducer';
import user from './userReducer';

const rootReducer = combineReducers({
    counter: counter,
    user: user,
})

export default rootReducer;