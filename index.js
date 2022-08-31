require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dbString = process.env.DATABASE_URL;
const actions = require('./controllers/actions');
const Inventory = require('./models/schemaInventory');
const Products = require('./models/schemaProduct');

mongoose.connect(dbString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected');
})

// database.close('disconnected', () => {
//     console.log('Database disconnected');
// })

const app = express();

app.use(express.json());
app.use('/api', actions);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
