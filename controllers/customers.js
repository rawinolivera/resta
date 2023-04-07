const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get request for all (READ)
const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('restaurants').collection('customers').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//get request for single (READ)
const getSingle = async (req, res, next) => {
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb().db('restaurants').collection('customers').find({ _id: customerId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  // post request )(CREATE)
const newCust = async (req, res, next) => {
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      favoriteMeal: req.body.favoriteMeal,
      birthday: req.body.birthday,
      paymentMethod: req.body.paymentMethod
    };
    const response = await mongodb
      .getDb().db('restaurants').collection('customers').insertOne(customer);
    if(response.acknowledged){
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Error, customer not created");
    }
  };

  //put request (update)
const updateCust = async (req, res, next) => {
    const customerId = new ObjectId(req.params.id);
    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      favoriteMeal: req.body.favoriteMeal,
      birthday: req.body.birthday,
      paymentMethod: req.body.paymentMethod
    };
    const response = await mongodb
      .getDb().db('restaurants').collection('customers').replaceOne({ _id: customerId }, customer);
    if(response.acknowledged){
      res.status(204).json(response);
    } else {
      res.status(500).json(response.error || "Error, customer not updated");
    }
  };

  //delete request (DELETE)
const deleteCust = async (req, res, next) => {
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb().db('restaurants').collection('customers').deleteOne({ _id: customerId }, true);
    if(response.acknowledged){
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "Error, customer not deleted");
    }
  }

module.exports = { getAll, getSingle, newCust, updateCust, deleteCust }