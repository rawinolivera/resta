const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get request for all (READ)
const getAll = async (req, res, next) => {
    const result = await mongodb
      .getDb()
      .db('restaurants')
      .collection('meals')
      .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//get request for single (READ)
const getSingle = async (req, res, next) => {
    const mealId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb().db('restaurants').collection('meals').find({ _id: mealId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  // post request )(CREATE)
const newMeal = async (req, res, next) => {
    const meal = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    };
    const response = await mongodb
      .getDb().db('restaurants').collection('meals').insertOne(meal);
    if(response.acknowledged){
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Error, meal not created");
    }
  };

  //put request (update)
const updateMeal = async (req, res, next) => {
    const mealId = new ObjectId(req.params.id);
    const meal = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    const response = await mongodb
      .getDb().db('restaurants').collection('meals').replaceOne({ _id: mealId }, meal);
    if(response.acknowledged){
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || "Error, meal not updated");
    }
  };

  //delete request (DELETE)
const deleteMeal = async (req, res, next) => {
    const mealId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb().db('restaurants').collection('meals').deleteOne({ _id: mealId }, true);
    if(response.acknowledged){
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "Error, meal not deleted");
    }
  }

module.exports = { getAll, getSingle, newMeal, updateMeal, deleteMeal }