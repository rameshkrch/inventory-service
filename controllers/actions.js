const express = require('express');
const { Model } = require('mongoose');
const action = express.Router();
const modelInventory = require('../models/schemaInventory');
const modelProducts = require('../models/schemaProduct');

//Sell product
action.patch('/sell/:id', (req, res) => {
    res.send('Update by ID API')
})

//Get single product
action.get('/getSingleProduct/:id', (req, res) => {
    res.send('Getby ID API')
})

//Get all products
action.get('/getAllProducts', async (req, res) => {
    try {
        const productsData = await modelProducts.find();
        const inventoryData = await modelInventory.find();

        var minQty;

        for (const product of productsData) {
            let articles = [];
            articles.push(product.contain_articles);
            for (const article of articles) {
                console.log(article);
            }



        }



        //        const productsStock = getProductStock(productsData, inventoryData);
        res.json(productsData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all inventories
action.get('/getAllInventory', async (req, res) => {
    try {
        const inventoryData = await modelInventory.find();
        res.json(inventoryData);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Add Inventory
action.post('/addInventory', async (req, res) => {
    const data = new modelInventory({
        art_id: req.body.art_id,
        name: req.body.name,
        stock: req.body.stock
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Add products
action.post('/addProducts', async (req, res) => {
    const data = new modelProducts({
        name: req.body.name
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = action;