const express = require('express');
const router = express.Router();

const RecipeController = require('../controllers/recipe');

router.get('/', RecipeController.recipe_getAll);

router.post('/', RecipeController.recipe_post);

router.get('/:recipeId', RecipeController.recipe_get);

router.delete('/:recipeId', RecipeController.recipe_delete);

module.exports = router;