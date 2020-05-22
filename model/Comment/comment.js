const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = new Schema({
    Comment: {
      type: String,
      required: true
    },

    Review: {
        type: Number,
        required: true,
        default:0
    },

    date: {
      type: Date,
      required: true,
    },

    ProductId:{
        type: String
    },

    UserId:{
        type: String
    },
    Username: {
      type: String
    }
},
    {
        collection: 'Comments'
    });

module.exports = mongoose.model('Comments', Comment);
