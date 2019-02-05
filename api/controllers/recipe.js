const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const mongoose = require('mongoose');

exports.recipe_getAll = (req, res, next) => {
    Recipe
        .find()
        .select('ingredient instructions _id')
        .populate('ingredient', 'title')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                recipe: docs.map(doc => {
                    return {
                        _id: doc._id,
                        ingredient: doc.ingredient,
                        instructions: doc.instructions,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/recipe/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.recipe_post = (req, res, next) => {
    Ingredient.findById(req.body.ingredientId)
        .then(ingredient => {

            if (!ingredient) {
                return res.status(404).json({
                    message: 'Ingredient not found'
                })
            }

            const recipe = new Recipe({
                _id: mongoose.Types.ObjectId(),
                instructions: req.body.instructions,
                ingredient: req.body.ingredientId
            });

            return recipe.save();
        })
        .then(result => {
            res.status(201).json({
                createdRecipe: {
                    _id: result._id,
                    ingredient: result.ingredient,
                    instructions: result.instructions
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipe/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
};

exports.recipe_get = (req, res, next) => {
    Recipe.findById(req.params.recipeId)
        .populate('ingredient')
        .exec()
        .then(recipe => {

            if (!recipe) {
                return res.status(404).json({
                    message: 'Recipe not found'
                });
            }

            res.status(200).json({
                recipe: recipe,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipe/'
                }
            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
};

exports.recipe_delete = (req, res, next) => {
    Recipe.remove({_id: req.params.recipeId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe deleted',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipe/',
                    body: {
                        recipeId: 'ID',
                        instructions: 'String'
                    }
                }
            });
        })
        .catch(err => {res.status(500).json({error: err});
    });
};