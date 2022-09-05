const express = require('express');
const { Model } = require('mongoose');
const action = express.Router();
const modelInventory = require('../models/schemaInventory');
const modelProducts = require('../models/schemaProduct');

//Sell product
action.put('/sell/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await modelProducts.findById(id);
        const inventory = await modelInventory.find();
        for (let article of product.contain_articles) {
            let query = { art_id: article.art_id};
            let options = {useFindAndModify: false, new: true};

            let findArticle = inventory.find(o => o.art_id == article.art_id);
            let newQty = findArticle.stock - article.amount_of;

            modelInventory.findOneAndUpdate(query, { stock: newQty}, options, (err, result) => {
                if (err) return err
            })
        }
        res.send(product.name + " sold!");
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
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

        let minQty = [];
        for (let product of productsData) {
            let qty = [];
            for (const article of product.contain_articles) {
                let findArticle = inventoryData.find(o => o.art_id == article.art_id);
                qty.push(Math.floor(findArticle.stock/article.amount_of));
            }
            minQty.push(product.name + ' : ' + Math.min(...qty));
        }
        res.json(minQty);
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