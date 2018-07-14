import { GET_MOST_RECENT_APPROVED_RECIPES } from '../actions/actionTypes';

export function createHomeReducer(state = { success: false }, action) {
    switch (action.type) {
        case GET_MOST_RECENT_APPROVED_RECIPES:
            return Object.assign({}, state, { mostRecentRecipes: action.recipes });
        default:
            return state;
    }
}