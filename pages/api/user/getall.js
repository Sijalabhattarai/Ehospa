import connect from "../../../db/connect";
import user from "../../../db/modals/user";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.send("Hello World")
    }
    connect();
    var data = await user.find({})
    return res.status(200).json({ data: data })
}
