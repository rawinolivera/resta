const express = require('express');
const router = express.Router();
const { validateCreate } = require('../validator/customers')

const custController = require('../controllers/customers');

router.get('/', custController.getAll);

router.get('/:id', custController.getSingle);

router.post('/', validateCreate, custController.newCust);

router.put('/:id', validateCreate, custController.updateCust);

router.delete('/:id', custController.deleteCust);

module.exports = router;