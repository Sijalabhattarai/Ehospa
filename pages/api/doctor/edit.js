import appointment from "../../../db/modals/doctors";
import connect from "../../../db/connect";

export default async function handler(req, res) {
    var { email, speciality, phone, image, name, available } = req.body;
    console.log(req.body)
    connect();

    if (req.method !== "PUT") {
        return res.send("Hello World")
    }

    var check = await appointment.findOne({ email: email })
    if (!check) {
        return res.status(422).json({ status: "fail", error: "Doctor not found" })
    }

    var data = {
        email: email,
        name: name,
        phone: phone,
        image: image,
        speciality: speciality,
        available: available
    }

    await appointment.findOneAndUpdate({ email: email }, data);

    return res.status(200).json({ status: "success", message: "Doctor details updated successfully" });
}