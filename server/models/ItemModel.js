const mongoose = require('mongoose');

const ItemSchema= new mongoose.Schema({
    note:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;