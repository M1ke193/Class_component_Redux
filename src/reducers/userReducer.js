import { DELETE_USER, SET_USER } from '../actions/user';

const initialState = {
    profile: {
        firstName: undefined,
        lastName: undefined,
        birthdate: undefined,
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                profile: action.payload.profile,
            };
        case DELETE_USER:
            return {
                ...state,
                profile: {
                    firstName: undefined,
                    lastName: undefined,
                    birthdate: undefined,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
