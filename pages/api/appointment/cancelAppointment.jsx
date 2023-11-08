import connect from "../../../db/connect"
import appointment from "../../../db/modals/appointment";

export default async (req, res) => {
    connect()
    const { appointmentId } = req.body
    try {
        const appointmentDetails = await appointment.findOne({ _id: appointmentId })
        if (appointmentDetails) {
            const cancelAppointment = await appointment.findOneAndUpdate({ _id: appointmentId }, { status: 'cancelled' })
            res.status(200).json({ success: true, message: 'Appointment Cancelled' })
        } else {
            res.status(200).json({ success: false, message: 'Appointment not found' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong' })
    }
}