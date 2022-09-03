const mongoose = require('mongoose');

const products = new mongoose.Schema({
    name: String,
    contain_articles: [{
        art_id: Number,
        amount_of: Number
    }],
    price: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('products', products, 'products');