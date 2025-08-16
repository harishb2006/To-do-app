const mongoose = require('mongoose');

const ItemSchema= new mongoose.Schema({
    note:{
        type:String,
        required:true
    },
    completed: { type: Boolean, default: false }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;