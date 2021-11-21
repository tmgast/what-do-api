var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationsSchema = new Schema({
  id: String,
  name: String,
  latitude: String,
  longitude: String,
  url: String,
  rating: {type: Number, default: 0}
});

var LocationsModel = mongoose.model(
  'LocationsModel', 
  LocationsSchema
);
