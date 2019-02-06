const express = require('express');
const router = express.Router();

const RecipeBookController = require('../controllers/recipe_book');

router.get('/', RecipeBookController.recipeBook_getRecipeBook);

router.post('/', RecipeBookController.recipeBook_createRecipeBook);

router.delete('/', RecipeBookController.recipeBook_deleteRecipeBook);

module.exports = router;