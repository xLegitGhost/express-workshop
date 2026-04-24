import jwt from 'jsonwebtoken';
const JWT_SECRET = "debugKey"; // Use an env variable in production

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                code: 401, 
                error: "Token not provided" 
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            code: 401, 
            error: "Unauthorized" 
        });
    }
};
