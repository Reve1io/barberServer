const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header missing or invalid'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        // 3. Обрабатываем разные типы ошибок
        let message = 'Invalid token';
        if (err.name === 'TokenExpiredError') {
            message = 'Token expired';
        } else if (err.name === 'JsonWebTokenError') {
            message = 'Malformed token';
        }

        return res.status(403).json({
            success: false,
            message
        });
    }
};

module.exports = authenticate;