var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
