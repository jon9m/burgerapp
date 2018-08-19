import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticating: false,
    authenticated: false,
    error: null,
    token: null,
    userid: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                authenticating: true,
                authenticated: false,
                error: null,
                token: null,
                userid: null
            };
        case actionTypes.AUTH_SUCCESS: {
            return {
                token: action.token,
                userid: action.userId,
                authenticating: false,
                authenticated: true,
                error: null
            }
        }
        case actionTypes.AUTH_FAIL: {
            return {
                token: null,
                authenticating: false,
                authenticated: false,
                error: action.error,
                userid: null
            }
        }
        case actionTypes.AUTH_LOGOUT: {
            return {
                token: null,
                authenticating: false,
                authenticated: false,
                error: null,
                userid: null
            }
        }
        default:
            return state;
    }
};

export default reducer;