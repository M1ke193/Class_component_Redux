export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (data) => ({
    type: FETCH_USER_SUCCESS,
    payload: data,
});
const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    payload: error,
});

export const fetchUserAction = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUserRequest());
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            if (!response.ok) throw new Error('Fetch user failed');
            const data = await response.json();
            dispatch(fetchUserSuccess(data));
        } catch (error) {
            dispatch(fetchUserFailure(error.message));
        }
    };
};
