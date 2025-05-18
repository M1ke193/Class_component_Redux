import { combineReducers } from 'redux';
import counter from './counterReducer';
import user from './userReducer';
import userApi from './userApiReducer';

const rootReducer = combineReducers({
    counter: counter,
    user: user,
    userApi: userApi,
})

export default rootReducer;