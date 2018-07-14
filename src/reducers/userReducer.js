import { GET_INIT_USER_PROFILE_SUCCESS, GET_OWN_RECIPES_SUCCESS } from '../actions/actionTypes';

export function createUserReducer(state = {}, action) {
    switch (action.type) {
        case GET_INIT_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, { initialData: action.data });
        case GET_OWN_RECIPES_SUCCESS:
            return Object.assign({}, state, { recipes: action.recipes });
        default:
            return state;
    }
};