import appointment from "../../../db/modals/doctors";
import connect from "../../../db/connect";

export default async function handler(req, res) {
    var { _id } = req.body;
    connect();

    await appointment.findByIdAndDelete({ _id })
    return res.status(200).json({ status: "success", message: "Success" })
}

