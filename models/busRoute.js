
const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  currentLocation: {
    type: String,
    required: true
  },
  destinationName: {
    type: {
      type: String,
      default: true
    },
    busStops: {
      type: String,
      required: true
    }
  }
});

// const busRouteSchema = new mongoose.Schema({
//   routeNumber: {
//     type: Number,
//     required: true
//   },
//   stops: [busStopSchema]
// });

// Create a Mongoose model based on the schema
const BusRoute = mongoose.model('routes', busStopSchema);

module.exports = BusRoute;