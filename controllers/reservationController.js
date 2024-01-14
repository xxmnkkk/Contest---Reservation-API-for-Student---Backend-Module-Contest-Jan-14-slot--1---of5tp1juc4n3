const Resource = require('../models/resourceModel');
const Student = require('../models/studentModel');

exports.reserveResource = async (req, res) => {
  try {
    // TODO: Extract necessary details from the request body (resourceId, studentId, startTime, endTime)
     const { resourceId, studentId, startTime, endTime } = req.body;
    // TODO: Check resource availability by fetching it from the database
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // TODO: Check student existence by fetching it from the database
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // TODO: Create reservation by updating resource details and save it
    if (!resource.isAvailable) {
      return res.status(400).json({ message: 'Resource is not available for reservation' });
    }

    const reservation = {
      studentId,
      startTime,
      endTime,
    };

    resource.reservations.push(reservation);
    resource.isAvailable = false;
    await resource.save();
    // TODO: Send a success response with the reservation details
    res.status(200).json({ message: 'Resource reserved successfully', reservation: reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
