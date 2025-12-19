const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "something went wrong",
            data: {},
            success: false,
            err:  "Email and password are required"
        });
    }
    next();
}

module.exports = {
    validateUserAuth
};