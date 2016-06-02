var mongoose = require('mongoose'),
assert = require('assert');

var Dish = require('./models/dish-1');
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to server successfully.');

    Dish.create({
        name: 'Tomato omelet',
        description: 'One delicious food with tomato and egg'
    }, function(err, dish) {
        if (err) throw err;

        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        setTimeout(function() {
            Dish.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated test'
                }
            }, {
                new: true
            })
                .exec(function(err, dish) {
                    if (err) throw err;
                    console.log('Updated dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function() {
                        db.close();
                    });
                });
        }, 3000);
    });
});
