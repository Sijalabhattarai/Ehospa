import { getSession } from "next-auth/react";
import connect from "../../../db/connect";
import user from "../../../db/modals/user";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.send("Hello World")
    }
    var session = await getSession({ req });
    connect();
    if (!session) {
        return res.status(401).json({ error: "You need to be signed in" })
    } else {
        var data = await user.findOne({ email: session.user.email })
        var refineData = {
            name: data.name,
            email: data.email,
            image: data.image,
            _id: data._id,
            role: data.role
        }
        return res.status(200).json({ data: refineData })
    }
}

