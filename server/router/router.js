const express = require('express');
const router = express.Router();

const controllers = require('../userController/controller');

router.post('/book',controllers.addBook);
router.get('/books',controllers.getBooks);
router.get('/book/:id',controllers.getBook);

module.exports = router;