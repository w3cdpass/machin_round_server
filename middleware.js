const jwt = require('jsonwebtoken');
const mysecret = 'dfdfdfdf';

exports.middleWare = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, mysecret)
        // console.log(decoded)
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

