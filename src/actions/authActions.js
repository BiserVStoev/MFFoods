import { REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, REDIRECTED } from '../actions/actionTypes';
import { login, register } from '../api/remote';

function registerSuccess() {
    return {
        type: REGISTER_SUCCESS
    };
};

function registerError(message) {
    return {
        type: REGISTER_ERROR,
        message: message
    };
};

function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    };
};

function loginError(message) {
    return {
        type: LOGIN_ERROR,
        message: message
    };
};

export function redirect() {
    return {
        type: REDIRECTED
    };
};

function registerAction(username, email, password) {
    return (dispatch) => {
        return register(username, email, password)
            .then(json => {
                if(json.error) {
                    dispatch(registerError(json.description));
                    return;
                }
                dispatch(registerSuccess());
            });
    };
};

function loginAction(username, password) {
    return (dispatch) => {
        return login(username, password)
            .then(json => {
                console.log(json);
                if(json.error) {
                    dispatch(loginError(json.description));
                    return;
                }
                localStorage.setItem('authToken', json._kmd.authtoken);
                localStorage.setItem('user', json.username);
                dispatch(loginSuccess());
            });
    };
}

function logoutAction() {
    return (dispatch) => {
        localStorage.clear();
    };
};

export { registerAction, loginAction, logoutAction };