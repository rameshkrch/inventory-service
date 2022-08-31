const mongoose = require('mongoose');

const products = new mongoose.Schema({
    name: String,
    contain_articles: {
        art_id: String,
        amount_of: String
    },
    price: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('products', products, 'products');