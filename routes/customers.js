const express = require('express');
const router = express.Router();

const custController = require('../controllers/customers');

router.get('/', custController.getAll);

router.get('/:id', custController.getSingle);

router.post('/', custController.newCust);

router.put('/:id', custController.updateCust);

router.delete('/:id', custController.deleteCust);

module.exports = router;