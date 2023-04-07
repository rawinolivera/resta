const express = require('express');
const router = express.Router();
const { validateCreate } = require('../validator/meals')

const mealsController = require('../controllers/meals');

router.get('/', mealsController.getAll);

router.get('/:id', mealsController.getSingle);

router.post('/', validateCreate, mealsController.newMeal);

router.put('/:id', validateCreate, mealsController.updateMeal);

router.delete('/:id', mealsController.deleteMeal);

module.exports = router;