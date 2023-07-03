import connect from "../../../db/connect"
import user from "../../../db/modals/user"

export default async function handler(req, res) {
    var { email, name, image } = req.body;
    connect();

    if (req.method !== "POST") {
        return res.send("Hello World")
    }


    if (!email || !name || !image) {
        return res.status(422).json({ error: "Please fill all the fields" })
    } else {
        try {
            //    check email if exist
            var emailtoChech = await user.findOne({ email: email })
            if (emailtoChech) {
                return res.status(200).json({ message: "Success" })
            } else {
                var newUser = await user.create({
                    name,
                    email,
                    image
                })
                return res.status(200).json({ message: "Success" })
            }
        } catch (err) {
            return res.status(500).json({ error: "Something went wrong", message: err.message })
        }
    }


}