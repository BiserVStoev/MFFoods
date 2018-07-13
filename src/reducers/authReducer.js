import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED } from '../actions/actionTypes';

export function registerReducer(state = { success: false }, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, state, { success: true });
        case REGISTER_ERROR:
            return Object.assign({}, state, { message: action.message });
        case REDIRECTED:
            return Object.assign({}, state, { success: false });
        default:
            return state;
    }
}

export function loginReducer(state = { success: false }, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { success: true });
        case LOGIN_ERROR:
            return Object.assign({}, state, { message: action.message });
        case REDIRECTED:
            return Object.assign({}, state, { success: false });
        default:
            return state;
    }
}