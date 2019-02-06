const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');

router.get('/', RecipeController.recipe_getAllRecipes);

router.post('/', RecipeController.recipe_createRecipe);

router.get('/:recipeId', RecipeController.recipe_getRecipe);

router.delete('/:recipeId', RecipeController.recipe_deleteRecipe);

module.exports = router;