const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    ingredient: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }],
    instructions: [String],
    image: String
});

module.exports = mongoose.model('Recipe', recipeSchema);