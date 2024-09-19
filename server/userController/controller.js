const {error_function , success_function} = require('../utils/responseHandler');
const books = require('../db/models/books');

exports.addBook = async function(req, res) {

    try {

        let body = req.body;
        console.log("body : ",body);

        let db_response = await books.create(body);

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product added successfully..."
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "product adding failed..."
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

exports.getBooks = async function(req, res) {

    try {

        let findResponse = await books.find();

        let strbooks = JSON.stringify(findResponse);
        console.log("strResponse : ",strbooks);

        let response = success_function({
            success : true,
            statusCode : 200,
            data : strbooks
        });

        res.status(response.statusCode).send(response);
        return;

        
    } catch (error) {

        console.log("error form get all books from server : ",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "get all books failed from server"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

exports.getBook = async function(req, res) {

    try {

        let id = req.params.id;
        console.log("id : ",id);

        let db_response = await books.findOne({_id : id});

        let strbook = JSON.stringify(db_response);
        console.log("strbook : ",strbook);

        let response = success_function({
            success : true,
            statusCode : 200,
            data : strbook
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error form get book from server : ",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "get book failed from server"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

exports.updateBook = async function(req, res) {

    try {

        let id = req.params.id;
        console.log("id : ",id);

        let body = req.body;
        console.log("body : ",body);

        await books.updateOne({_id : id},{$set : body});

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "book data updated successfully"
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "book data updation failed"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}

exports.deleteBook = async function(req, res) {

    try {

        let id = req.params.id;
        console.log("id : ",id);

        await books.deleteOne({_id : id});

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "book data deleted successfully"
        });

        res.status(response.statusCode).send(response);
        return;
        
    } catch (error) {

        console.log("error : ",error);

        let response = error_function({
            success : false,
            statusCode : 400,
            message : "book data deletion failed"
        });

        res.status(response.statusCode).send(response);
        return;
        
    }

}