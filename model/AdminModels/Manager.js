const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StoreManager = new Schema({

    managerID: {
        type: String,
        required: true
    },

    fname: {
        type: String,
        required: true
    },

    lname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    DOB: {
        type: String,
        required: true
    },

    NIC: {
        type: String,
        required: true
    },

    address: {
        type:String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    Gender: {
        type: String,
        required: true
    },

},
{
    collection: 'StoreManager'
});

module.exports = mongoose.model('StoreManager',StoreManager);
