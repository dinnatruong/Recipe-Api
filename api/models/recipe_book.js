const mongoose = require('mongoose');

const recipeBookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    }]
});

module.exports = mongoose.model('RecipeBook', recipeBookSchema);