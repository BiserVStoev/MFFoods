import { 
    CREATE_RECIPE_SUCCESS, 
    GET_OWN_RECIPES_SUCCESS, 
    GET_INIT_USER_PROFILE_SUCCESS, 
    GET_MOST_RECENT_APPROVED_RECIPES, 
    REDIRECTED,
    GET_MOST_RECENT_NOT_APPROVED_RECIPES_SUCCESS
} from '../actions/actionTypes';
import { 
    createRecipe, 
    getInitialUserData, 
    getUserOwnRecipes, 
    getMostRecentApprovedRecipes,
    getLatestNotApprovedRecipes 
} from '../api/remote';

function createRecipeSuccess() {
    return {
        type: CREATE_RECIPE_SUCCESS
    };
};

function getUserProfileInitialDataSuccess(data) {
    return {
        type: GET_INIT_USER_PROFILE_SUCCESS,
        data: data
    }
};

function getUserOwnRecipesSuccess(recipes) {
    return {
        type: GET_OWN_RECIPES_SUCCESS,
        recipes: recipes
    }
};

function getMostRecentApprovedRecipesSuccess(recipes){
    return {
        type: GET_MOST_RECENT_APPROVED_RECIPES,
        recipes: recipes
    }
};

function getMostRecentNotApprovedRecipesSuccess(recipes){
    return {
        type: GET_MOST_RECENT_NOT_APPROVED_RECIPES_SUCCESS,
        recipes: recipes
    }
};

export function redirect() {
    return {
        type: REDIRECTED
    };
};

function createRecipeAction(dataToSend) {
    return (dispatch) => {
        const { title, picture, description, servings, protein, fat, carbs, ingredients, instructions, isApproved } = dataToSend;
        return createRecipe(title, picture, description, servings, protein, fat, carbs, ingredients, instructions, isApproved)
            .then(json => {
                console.log(json)
                dispatch(createRecipeSuccess());
            });
    };
};

function getInitialUserDataAction(){
    return (dispatch) => {
        return getInitialUserData()
            .then(data => {
                dispatch(getUserProfileInitialDataSuccess(data));
            });
    };
};

function getUserOwnRecipesSuccessAction(page){
    return (dispatch) => {
        return getUserOwnRecipes(page)
            .then(data => {
                dispatch(getUserOwnRecipesSuccess(data));
            });
    };
};

function getMostRecentApprovedRecipesAction() {
    return (dispatch) => {
        return getMostRecentApprovedRecipes()
            .then(data => {
                dispatch(getMostRecentApprovedRecipesSuccess(data));
            });
    };
};

function getMostRecentNotApprovedRecipesAction(){
    return (dispatch) => {
        return getLatestNotApprovedRecipes()
            .then(data => {
                dispatch(getMostRecentNotApprovedRecipesSuccess(data));
            });
    };
};

export { 
    createRecipeAction, 
    getInitialUserDataAction, 
    getUserOwnRecipesSuccessAction,
    getMostRecentApprovedRecipesAction,
    getMostRecentNotApprovedRecipesAction 
};