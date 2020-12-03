const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, "secret", (err, decodetoken) => {
            console.log(decodetoken);
            if (err) {
                console.log("error in verification of jwt token");
                return res.sendStatus(403);
            }

            req.decodetoken = decodetoken;
            next();
        });
    } else {
        console.log("No auth header");
        res.sendStatus(401);
    }
};

module.exports = {authenticateJWT:authenticateJWT}