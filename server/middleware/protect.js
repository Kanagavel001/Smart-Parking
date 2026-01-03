import User from "../models/User.js";


export const protectUser = async (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return res.json({ success: false, message: "Login first" });
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

export const protectAdmin = async (req, res, next) => {
    try {
        const { userId } = req.body;
        
        if(userId !== 'user_37CJYBGpVSTZXf5PbnjgdADXyvU'){
            return res.json({success: false})
            
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}