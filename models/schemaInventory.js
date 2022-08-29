const mongoose = require('mongoose');

const inventory = new mongoose.Schema({
    art_id: Number,
    name: String,
    stock: Number
}, {
    versionKey: false
}, {
    collection: 'inventory'
})

module.exports = mongoose.model('inventory', inventory);