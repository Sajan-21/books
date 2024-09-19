const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    publish : {
        type : String,
        require : true
    },
    release_date : {
        type : Number,
        require : true
    },
    price : {
        type : Number,
        require : true
    }
});

const books = mongoose.model("books",booksSchema);
module.exports = books;