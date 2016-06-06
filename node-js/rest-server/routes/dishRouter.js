var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dish = require('../models/dish');

var router = express.Router();

router.route('/')
    .get(function(req, res, next) {
        Dish.find({}, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .post(function(req, res, next) {
        Dish.create(req.body, function(err, dish) {
            if (err) throw err;

            console.log('Dish created!');
            var id = dish._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the dish with id: ' + id);
        });
    })
    .delete(function(req, res, next) {
        Dish.remove({}, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

router.route('/:dishId')
    .get(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .put(function(req, res, next) {
        Dish.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function(err, dish) {
            if (err) throw err;
            res.json(dish);
        });
    })
    .delete(function(req, res, next) {
        Dish.remove(req.params.dishId, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

module.exports = router;
