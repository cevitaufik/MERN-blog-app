const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/blog-app';
db.articles = require('./model.js')(mongoose);

module.exports = db;
