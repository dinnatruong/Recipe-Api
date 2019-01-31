const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    quantity: Number,
    unit: String
});

module.exports = mongoose.model('Ingredient', ingredientSchema);