import { registerReducer, loginReducer } from './authReducer';
import { createRecipeReducer } from './recipeReducer';
import { createUserReducer } from './userReducer';
import { createHomeReducer } from './homeReducer';
import { adminReducer } from './adminReducer';

export default {
    register: registerReducer,
    login: loginReducer,
    createRecipe: createRecipeReducer,
    user: createUserReducer,
    home: createHomeReducer,
    admin: adminReducer
};