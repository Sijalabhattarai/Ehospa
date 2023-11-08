import appointment from "../../../db/modals/doctors";
import connect from "../../../db/connect";

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        connect();

        const doctor = await appointment.findById(id);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        return res.status(200).json({ success: true, data: doctor });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
}
