const express = require('express');
const ObjectID = require('mongodb').ObjectID


const createRouter = function (collection) {

  const router = express.Router();

  //Index
  router.get("/",(req,res) => {
    collection.find().toArray()
    .then((docs) => res.json(docs))
  });

  //Show
  router.get("/:id",(req,res) => {
    collection.findOne({_id: ObjectID(req.params.id)})
    .then((docs) => res.json(docs));
  });

  //Create
  router.post("/",(req,res) => {
    collection.insertOne(req.body)
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  })

  //Delete
  router.post("/:id",(req,res) => {
    collection.deleteOne({_id: ObjectID(req.params.id)})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  });

  //Update
  router.put("/:id",(req,res) => {
    collection.updateOne({ _id: ObjectID(req.params.id)},
                         {$set: req.body})
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs));
  })

  return router;

};



module.exports = createRouter;
