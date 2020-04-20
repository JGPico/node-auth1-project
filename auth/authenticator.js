function authenticator( req, res, next ) {
    console.log("Session ", req.session);
    if (req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({message: 'You cannot pass!'});
    }
}

module.exports = authenticator;