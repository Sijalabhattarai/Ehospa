import doctors from "../../../db/modals/doctors";
import connect from "../../../db/connect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    const { id } = req.query;

    // get email from session
    const email = session.user.email;

    connect();

    try {
        const doctor = await doctors.findOne({ email: email });
        if (doctor) {
            res.status(200).json({ status: true, message: "Doctor", data: doctor });
        }
        else {
            res.status(200).json({ status: false, message: "Not a doctor" });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Error getting doctor," + error });
    }

}

