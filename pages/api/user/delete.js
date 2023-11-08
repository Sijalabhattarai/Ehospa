import { getSession } from "next-auth/react";
import connect from "../../../db/connect";
import user from "../../../db/modals/user";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.send({ message: "Hello World" })
    }
    var session = await getSession({ req });
    connect();

    const id = req.query.id;

    // get user from sesion email
    const userFromSession = await user.findOne({ email: session.user.email });

    // check if user is admin
    if (!userFromSession.role === "admin") {
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    try {
        // check if user is admin or not
        const userData = await user.findById(id);
        if (!userData) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        if (userData.role === "admin") {
            return res.status(401).json({ status: false, message: "Cant delete Admin." });
        }

        await user.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Error deleting user," + error });
    }
}

