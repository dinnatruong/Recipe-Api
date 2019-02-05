const express = require('express');
const router = express.Router();

const IngredientController = require('../controllers/ingredient');

router.get('/', IngredientController.ingredient_getAll);

router.post('/', IngredientController.ingredient_post);

router.get('/:ingredientId', IngredientController.ingredient_get);

router.patch('/:ingredientId', IngredientController.ingredient_patch);

router.delete('/:ingredientId', IngredientController.ingredient_delete);

module.exports = router;