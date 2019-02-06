const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    quantity: {type: String, required: true},
    unit: {type: String}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);