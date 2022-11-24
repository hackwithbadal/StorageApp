const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Forbidden');
    try {
        const VerifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = VerifiedUser;
        next();
    } catch (error) {
        res.send('Invalid token');
    }
};