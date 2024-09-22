const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    publish : {
        type : String,
        required : true
    },
    release_date : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
});

const books = mongoose.model("books",booksSchema);
module.exports = books;