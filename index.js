import * as dotenv from "dotenv"
import express from "express"
import dbConnection from './config/db.config.js'
import recipeRouter from "./routes/recipe.routes.js"
// import data from "./data.json"
// const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
// const Recipe = require('./models/Recipe.model.js').default;
// Import of the data from './data.json'
//const data = require('./data');

//const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
dotenv.config()

dbConnection()

const app = express()
app.use(express.json)
// Connection to the database "recipe-app"

app.use('/recipe',recipeRouter)
// http://localhost:8080/recipe/
// http://localhost:8080/recipe/create
// http://localhost:8080/recipe/edit/:id


// executar o servidor na porta 8080
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))