const express = require('express');
const router = express.Router();

const IngredientController = require('../controllers/ingredient');

router.get('/', IngredientController.ingredient_getAllIngredients);

router.post('/', IngredientController.ingredient_createIngredient);

router.get('/:ingredientId', IngredientController.ingredient_getIngredient);

router.patch('/:ingredientId', IngredientController.ingredient_updateIngredient);

router.delete('/:ingredientId', IngredientController.ingredient_deleteIngredient);

module.exports = router;