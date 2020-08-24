const auth_middleware = (req, res, next) => {
    // If user is not logged ib
    if (!req.user) {
        // NOTE: THIS RETURNS WITH STATUS CODE 200
        return res.json({success: false, msg: 'Not logged in.'});
    } else {
        // User is logged in, call next middleware
        next();
    }
}

module.exports = auth_middleware;
