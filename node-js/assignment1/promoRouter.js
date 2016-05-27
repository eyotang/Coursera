var express = require('express');
var bodyParser = require('body-parser');

function route() {
    var router = express.Router();
    router.use(bodyParser.json());

    router.route('/')
        .all(function(req, res, next) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            next();
        })
        .get(function(req, res, next) {
            res.end('Will send all the promotions to you!');
        })
        .post(function(req, res, next) {
            res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
        })
        .delete(function(req, res, next) {
            res.end('Deleting all promotions');
        });

    router.route('/:promotionId')
        .all(function(req, res, next) {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            next();
            })
        .get(function(req, res, next) {
            res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
        })
        .put(function(req, res, next) {
            res.write('Updating the promotion: ' + req.params.promotionId + '\n');
            res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
        })
        .delete(function(req, res, next) {
            res.end('Deleting promotions: ' + req.params.promotionId);
        });

    return router;
}

exports.route = route;
