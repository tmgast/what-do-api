const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDb connection error:'));

module.exports = { db };
