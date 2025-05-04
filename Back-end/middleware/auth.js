function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); 
    }
    return res.status(401).json({ message: "You must be logged in to access this page." });
}


module.exports = isAuthenticated;