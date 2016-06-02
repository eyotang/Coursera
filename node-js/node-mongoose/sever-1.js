var mongoose = require('mongoose'),
assert = require('assert');

var Dish = require('./models/dish-1');
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to server successfully.');

    var dish = new Dish({
        name: 'Tomato omelet',
        description: 'One delicious food with tomato and egg'
    });

    dish.save(function(err) {
        if (err) throw err;

        console.log('Dish created!');
        Dish.find({}, function(err, dishes) {
            if (err) throw err;

            console.log(dishes);
            db.collection('dishes').drop(function() {
                db.close();
            });
        });
    });
});
