const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    problem: {
        type: String,
        required: true,
    },
    dedicatedDoctor: {
        type: String,
        required: true,
    },
    queueNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
    prescription: {
        type: Array,
    },
    doctorNote: {
        type: String,
    },
    checkedBy: {
        type: String,
    },
}, {
    timestamps: true
}
);

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);