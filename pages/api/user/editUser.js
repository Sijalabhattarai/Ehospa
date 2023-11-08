import connect from "../../../db/connect";
import user from "../../../db/modals/user";

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.send("Hello World")
    }
    connect();
    const { _id, name, email, role } = req.body;
    try {
        const userData = await user.findById(_id);
        if (!userData) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        if (userData.role === "admin") {
            return res.status(401).json({ status: false, message: "Cant edit Admin." });
        }
        const updatedUser = await user.findByIdAndUpdate(_id, { name, email, role }, { new: true });
        res.status(200).json({ status: true, message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: false, message: "Error updating user," + error });
    }


}
