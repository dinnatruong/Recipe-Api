const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(
    "mongodb://dinna:"
        + process.env.MONGO_ATLAS_PW +
        "@recipedb-shard-00-00-n1idn.mongodb.net:27017,recipedb-shard-00-01-n1idn.mongodb.net:27017,recipedb-shard-00-02-n1idn.mongodb.net:27017/test?ssl=true&replicaSet=RecipeDB-shard-0&authSource=admin&retryWrites=true",
    {
        useNewUrlParser: true
    }
);

mongoose.Promise = global.Promise;

// Routes to handle requests
const ingredientRoute = require('./api/routes/ingredient');
const recipeRoute = require('./api/routes/recipe');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization");

     if (req.method === 'OPTIONS') {
        res.header('Access.Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
     }
     next();
});

app.use('/ingredient', ingredientRoute);
app.use('/recipe', recipeRoute);

app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 505);
    res.json({
        message: error.message
    });
});

module.exports = app;