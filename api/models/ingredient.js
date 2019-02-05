const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    quantity: {type: Number, required: true},
    unit: {type: String, required: true}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);