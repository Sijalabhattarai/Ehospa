import connect from "../../../db/connect"
import appointment from "../../../db/modals/appointment";

export default async function handler(req, res) {

    connect();
    const { checkedBy, doctorNote, prescription, id } = req.body;
    const status = "checked";



    try {
        const appointmentData = await appointment.findByIdAndUpdate(id, {
            checkedBy: checkedBy,
            doctorNote: doctorNote,
            prescription: prescription,
            status: status
        }, { new: true });
        res.status(200).json({ status: true, message: "Appointment updated successfully", data: appointmentData });
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Error updating appointment," + error });
    }

}

