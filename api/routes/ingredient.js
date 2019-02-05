const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('../models/ingredient');

router.get('/', (req, res, next) => {
    Ingredient
        .find()
        .select('title quantity unit _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                ingredients: docs.map(doc => {
                    return {
                        title: doc.title,
                        quantity: doc.quantity,
                        unit: doc.unit,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/ingredient/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    const ingredient = new Ingredient({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        quantity: req.body.quantity,
        unit: req.body.unit
    });

    ingredient
        .save()
        .then(result => {
            console.log(result);
                    
            res.status(201).json({
                createdIngredient: {
                    title: result.title,
                    quantity: result.quantity,
                    unit: result.unit,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/ingredient/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.get('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;

    Ingredient.findById(id)
        .select('title quantity unit _id')
        .exec()
        .then(doc => {
            console.log(doc);

            if (doc) {
                res.status(200).json({
                    ingredient: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/ingredient'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found.'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Ingredient
        .update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/ingredient/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});

router.delete('/:ingredientId', (req, res, next) => {
    const id = req.params.ingredientId;

    Ingredient
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Ingredient deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/ingredient/',
                    body: {
                        name: 'String',
                        quantity: 'Number',
                        unit: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;