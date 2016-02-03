var mongoose = require('mongoose');
 
module.exports = mongoose.model('Movie',{
    name: String,
    genre:String
});