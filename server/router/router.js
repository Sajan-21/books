const express = require('express');
const router = express.Router();

const controllers = require('../userController/controller');

router.post('/book',controllers.addBook);
router.get('/books',controllers.getBooks);
router.get('/book/:id',controllers.getBook);
router.put('/book/:id',controllers.updateBook);
router.delete('/book/:id',controllers.deleteBook);

module.exports = router;