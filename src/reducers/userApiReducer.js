import {
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    FETCH_USER_REQUEST,
} from '../actions/userApiAction';

const initialState = {
    loading: false,
    error: null,
    users: null,
};

const userApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userApiReducer;
