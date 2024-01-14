const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  // name: String (required)
  name: {
    type: String,
    required: true,
  },
  // The name of the resource.
  // type: String (required)
  type: {
    type: String,
    required: true,
  },
  // The type or category of the resource (e.g., Study Room, Equipment, Lab).
  // capacity: Number (required)
  capacity: {
    type: Number,
    required: true,
  },
  // The maximum capacity or limit for the resource.
  // isAvailable: Boolean (default: true)
  isAvailable: {
    type: Boolean,
    default: true,
  },
  // Indicates whether the resource is currently available for reservation.
  // reservations: Array of Reservation Objects
  reservations: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Assuming there is a 'Student' model
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
      },
      endTime: {
        type: Date,
        required: true,
      },
    },
  ],
  // Contains information about reservations made for the resource.
  //          -->studentId: ObjectId (required)
  //             The ID of the student making the reservation.
  //          -->startTime: Date (required)
  //             The start time of the reservation.
  //          -->endTime: Date (required)
  //             The end time of the reservation.
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
