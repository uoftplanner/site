const authMiddleware = (req, res, next) => {
  console.log(req.user);
  // If user is not logged in
  if (!req.user) {
    // NOTE: THIS RETURNS WITH STATUS CODE 200
    res.json({success: false, msg: 'Not logged in.'});
    return;
  }
  // User is logged in, call next middleware
  next();
};

module.exports = authMiddleware;
