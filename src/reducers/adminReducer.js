import { GET_MOST_RECENT_NOT_APPROVED_RECIPES_SUCCESS } from '../actions/actionTypes';

export function adminReducer(state = { success: false }, action) {
    switch (action.type) {
        case GET_MOST_RECENT_NOT_APPROVED_RECIPES_SUCCESS:
            return Object.assign({}, state, { recipes: action.recipes });
        default:
            return state;
    }
};