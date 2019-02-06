const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const mongoose = require('mongoose');

exports.recipe_getAllRecipes = (req, res, next) => {
    Recipe
        .find()
        .select('title ingredient instructions image _id')
        .populate('ingredient', 'title')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                recipe: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        ingredient: doc.ingredient,
                        instructions: doc.instructions,
                        image: doc.image,
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

exports.recipe_createRecipe = (req, res, next) => {
    const recipe = new Recipe({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        instructions: req.body.instructions,
        ingredient: req.body.ingredientId,
        image: req.body.image
    });

    recipe
        .save()
        .then(result => {
            res.status(201).json({
                createdRecipe: {
                    _id: result._id,
                    title: result.title,
                    ingredient: result.ingredient,
                    instructions: result.instructions,
                    image: result.image
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

exports.recipe_getRecipe = (req, res, next) => {
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

exports.recipe_deleteRecipe = (req, res, next) => {
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
                        title: 'String',
                        instructions: 'String',
                        image: 'String'
                    }
                }
            });
        })
        .catch(err => {res.status(500).json({error: err});
    });
};