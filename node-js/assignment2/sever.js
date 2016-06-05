var mongoose = require('mongoose'),
assert = require('assert');

var Dish = require('./models/dish');
var Promotion = require('./models/promotion');
var Leader = require('./models/leader');
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to server successfully.');

    /**
     * call create by sequence, then after each create action finished,
     * the callback will be called, which reflect on the display sequence.
     */
    Promotion.create({
        name: 'Weekend Grand Buffet',
        image: 'images/buffet.png',
        label: 'New',
        price: '19.99',
        description: 'Featuring...',
    }, function(err, promotion) {
        if (err) throw err;

        console.log('Promotion created!');
        console.log(promotion);

        Promotion.find({}, function(err, promotion) {
            if (err) throw err;
            console.log(promotion);
            db.collection('promotions').drop(function() {
                //db.close();
            });
        });
    });

    Leader.create({
        name: 'Peter Pan',
        image: 'images/alberto.png',
        designation: 'Chief Epicurios Officer',
        abbr: 'CEO',
        description: 'Our CEO, Peter...',
    }, function(err, leader) {
        if (err) throw err;

        console.log('Leader created!');
        console.log(leader);

        Leader.find({}, function(err, leader) {
            if (err) throw err;
            console.log(leader);
            db.collection('leaders').drop(function() {
                //db.close();
            });
        });
    });

    Dish.create({
        name: 'Tomato omelet',
        image: 'images/eyotang.png',
        category: 'mains',
        //label: 'Hot',
        price: '$4.99',
        description: 'One delicious food with tomato and egg',
        comments: [
            {
                rating: 3,
                comment: 'This is insane',
                author: 'eyotang'
            }
        ]
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

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling',
                        author: 'Ben'
                    });

                    dish.save(function(err, dish) {
                        console.log('Updated comments!');
                        console.log(dish);
                        db.collection('dishes').drop(function() {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});
