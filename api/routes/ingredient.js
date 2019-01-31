const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Ingredient = require('../models/ingredient');

router.get('/', (req, res, next) => {
    Ingredient
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
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
                createdIngredient: result
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
        .exec()
        .then(doc => {
            console.log(doc);

            if (doc) {
                res.status(200).json(doc);
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
            console.log(result);
            res.status(200).json(result);
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
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;