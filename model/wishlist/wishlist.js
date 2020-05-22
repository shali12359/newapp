const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wishlist = new Schema({
    Subtype: {
      type: String,
      required: true
    },

    DressPrice: {
        type: Number,
        required: true,
        default:0
    },

    Images: {
      type: Array,
      default:[]
    },

    UserId:{
        type: String
    },

    ProductId:{
        type: String
    }
},
    {
        collection: 'Wishlist'
    });

module.exports = mongoose.model('Wishlist', Wishlist);
