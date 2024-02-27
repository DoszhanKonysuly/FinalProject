// authMiddleware.js

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    // Check if user is authenticated
    if (req.session && req.session.user) {
        return next(); // User is authenticated, continue to the next middleware
    } else {
        res.redirect('/login'); // Redirect to login page if user is not authenticated
    }
}


module.exports = isAuthenticated;