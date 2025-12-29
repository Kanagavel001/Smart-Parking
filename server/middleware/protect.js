import User from "../models/User.js";


export const protectUser = async (req, res, next) => {
    const { userId } = req.auth()
    if (!userId) {
        return res.json({ success: false, message: "Not authenticated" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}