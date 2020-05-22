const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({

    UserId:{
        type: String
    },

    DressCode: {
        type: String,
        required: true
    },

    Category: {
        type: String,
        required: true
    },

    DressType: {
        type: String,
        required: true
    },

    Subtype: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    DressPrice: {
        type: Number,
        required: true,
        default:0
    },

    Discount: {
        type: Number,
        default:0
    },

    images: {
        type: Array,
        default:[]
    },

},
{
    collection: 'Product'
});

module.exports = mongoose.model('Product',Product);
