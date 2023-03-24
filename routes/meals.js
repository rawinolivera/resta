const express = require('express');
const router = express.Router();

const mealsController = require('../controllers/meals');

router.get('/', mealsController.getAll);

router.get('/:id', mealsController.getSingle);

router.post('/', mealsController.newMeal);

router.put('/:id', mealsController.updateMeal);

router.delete('/:id', mealsController.deleteMeal);

module.exports = router;