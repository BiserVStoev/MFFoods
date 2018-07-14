import { CREATE_RECIPE_SUCCESS, GET_OWN_RECIPES_SUCCESS } from '../actions/actionTypes';

export function createRecipeReducer(state = { success: false }, action) {
    switch (action.type) {
        case CREATE_RECIPE_SUCCESS:
            console.log('here')
            return Object.assign({}, state, { success: true });
        case GET_OWN_RECIPES_SUCCESS:
            return Object.assign({}, state, { posts: action.recipes});
        default:
            return state;
    }
}