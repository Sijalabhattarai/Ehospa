import connect from "../../../db/connect";
import user from "../../../db/modals/user";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.send("Hello World")
    }
    connect();
    const email = req.query.email;

    const userData = await user.findOne({ email: email });
    if (!userData) {
        return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, message: "User found", data: userData });

}
