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

router.route('/:dishId/comments')
    .get(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments);
        });
    })
    .post(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            dish.comments.push(req.body);

            dish.save(function(err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                console.log(dish);
                res.json(dish);
            });
        });
    })
    .delete(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }

            dish.save(function(err, result) {
                if (err) throw err;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments');
            });
        });
    });

router.route('/:dishId/comments/:commentId')
    .get(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })
    .put(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function(err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                console.log(dish);
                res.json(dish);
            });
        });
    })
    .delete(function(req, res, next) {
        Dish.findById(req.params.dishId, function(err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function(err, result) {
                if (err) throw err;
                res.json(result);
            });
        });
    });

module.exports = router;
