require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dbString = process.env.DATABASE_URL;
const actions = require('./controllers/actions');
const Inventory = require('./models/schemaInventory');
const Products = require('./models/schemaProduct');

var resources = {
    art_id: "$contain_articles.art_id",
    amount_of: "contain_articles.amount_of"
};

Products.aggregate([
    {
        $lookup: {
            from: Inventory,
            let: { art: "$contain_articles.art_id", amount: "$contain_articles.amount_of" },
            pipeline: [
                {
                    $match:
                    {
                        $expr:
                        {
                            $and:
                                [
                                    { $eq: ["$art_id", "$$art"] },
                                    { $gte: ["$stock", "$$amount"] }
                                ]
                        }
                    }

                },
                { $project: { art_id: 0, _id: 0 } }
            ],
            as: "stockdata"
        }
    }
])

mongoose.connect(dbString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected');
})

const app = express();

app.use(express.json());
app.use('/api', actions);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
