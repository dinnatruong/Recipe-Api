const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "handling GET"
    })
});

router.post('/', (req, res, next) => {
    const recipe = {
        ingredientId: req.body.ingredientId
    };

    res.status(200).json({
        message: "handling POST",
        createdRecipe: recipe
    })
});

router.get('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;

    res.status(200).json({
        message: "handling GET"
    })
});

router.patch('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;

    res.status(201).json({
        message: "handling PATCH"
    })
});

router.delete('/:recipeId', (req, res, next) => {
    const id = req.params.recipeId;

    res.status(200).json({
        message: "handling DELETE"
    })
});

module.exports = router;