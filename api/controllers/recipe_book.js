const RecipeBook = require('../models/recipe_book');
const mongoose = require('mongoose');

exports.recipeBook_getRecipeBook = (req, res, next) => {
    RecipeBook
        .find()
        .select('recipes _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                recipeBook: docs.map(doc => {
                    return {
                        _id: doc._id,
                        recipes: doc.recipes
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

exports.recipeBook_createRecipeBook = (req, res, next) => {
    const recipeBook = new RecipeBook({
        _id: mongoose.Types.ObjectId(),
        recipes: req.body.recipes
    });

    recipeBook
        .save()
        .then(result => {
            res.status(201).json({
                createdRecipeBook: {
                    _id: result._id,
                    recipes: result.recipes
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
};

exports.recipeBook_deleteRecipeBook = (req, res, next) => {
    RecipeBook.remove()
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe book deleted',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipeBook/',
                    body: {
                        recipeBookId: 'ID',
                        recipes: 'Recipe'
                    }
                }
            });
        })
        .catch(err => {res.status(500).json({error: err});
    });
};