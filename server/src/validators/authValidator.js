export const validateRegisterInput = (req,res,next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({success: false, message: "All fields are required" });
    }

    if(!name || name.trim().length<3){
        return res.status(400).json({ success: false, message: "Name must be at least 3 characters long" });
    }

    if(!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if(!password || password.length<8){
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    next();
}

export const validateLoginInput = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    next();
};