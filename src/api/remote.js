
import { get, post, } from './requester';

async function register(username, email, password) {
    const data = { username, email, password, roles: ['User'] };
    const res = await post('user', '', 'basic', data);
    return await res.json();
};

async function login(username, password) {
    const data = { username, password };
    const res = await post('user', 'login', 'basic', data);
    return await res.json();
};
async function createRecipe(title, picture, description, servings, protein, fat, carbs, ingredients, instructions, isApproved){
    const data = {
        title, picture, description, servings, protein, fat, carbs, ingredients, instructions, isApproved, publisher: localStorage.getItem('_id')
    }
    const res = await post('appdata', 'recipes', 'Kinvey', data);
    return await res.json();
};

async function getInitialUserData(){
    const recipes = await get('appdata', 'recipes', 'Kinvey', `{"publisher":"${localStorage.getItem('_id')}"}&sort={"_km.ect": -1}&limit=4`);
    const totalRecipes = await get('appdata', 'recipes/_count', 'Kinvey', `{"publisher":"${localStorage.getItem('_id')}"}&sort={"_km.ect": -1}&limit=4`);
    let totalRecipesLength = await totalRecipes.json();
    totalRecipesLength = totalRecipesLength.count;
    const approvedRecipes = await get('appdata', 'recipes/_count', 'Kinvey', `{"publisher":"${localStorage.getItem('_id')}", "isApproved": true}`);
    let approvedRecipesLength = await approvedRecipes.json();
    approvedRecipesLength = approvedRecipesLength.count;
    const notApprovedRecipes = await get('appdata', 'recipes/_count', 'Kinvey', `{"publisher":"${localStorage.getItem('_id')}", "isApproved": false}`);
    let notApprovedRecipesLength = await notApprovedRecipes.json();
    notApprovedRecipesLength = notApprovedRecipesLength.count;
    const recipesData = await recipes.json();
    const userData = {
        totalRecipesLength,
        approvedRecipesLength,
        notApprovedRecipesLength,
        recipesData
    };

    return await userData;
};

async function getUserOwnRecipes(page){
    const recipes = await get('appdata', 'recipes', 'Kinvey', `{"publisher":"${localStorage.getItem('_id')}"}&sort={"_km.ect": 1}&skip=${4*page}&limit=4`);
    return await recipes.json();
};

async function getMostRecentApprovedRecipes(){
    const recipes = await get('appdata', 'recipes', 'Kinvey', `{"isApproved": true}&sort={"_km.ect": 1}&limit=4`);
    return await recipes.json();
};

async function getSingleRecipe(id){
    const recipe = await get('appdata', `recipes/${id}`, 'Kinvey');
    const recipeObj =  await recipe.json();
    const ingredients = recipeObj.ingredients.split('$$$###').map(i => {
        const neededIndex = i.lastIndexOf('-');
        const name = i.substring(0, neededIndex).trim();
        const quantity = i.substring(neededIndex + 1, i.length);
        return {
            name,
            quantity
        };
    });
    const instructions = recipeObj.instructions.split('$$$###').map(i => {
        return /\d+?\.\s*(.+);*/g.exec(i)[1]
    });
    
    const data = {
        carbs: recipeObj.carbs,
        description: recipeObj.description,
        fat: recipeObj.fat,
        ingredients: ingredients,
        instructions: instructions,
        isApproved: recipeObj.isApproved,
        picture: recipeObj.picture,
        protein: recipeObj.protein,
        servings: recipeObj.servings
    };

    return data;
};

async function getLatestNotApprovedRecipes(){
    const notApprovedRecipes = await get('appdata', 'recipes', 'Kinvey', `{"isApproved": false}&sort={"_km.ect": 1}&limit=8`);
    return await notApprovedRecipes.json();
};

export { 
    register, 
    login, 
    createRecipe, 
    getInitialUserData, 
    getUserOwnRecipes, 
    getMostRecentApprovedRecipes, 
    getSingleRecipe, 
    getLatestNotApprovedRecipes 
};