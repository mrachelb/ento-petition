// middleware.js

module.exports = {
    requireNoSignature,
    fn
    //I can export more than one function
};

function fn() {
    console.log("yoshjafsd");
}

function requireNoSignature(req, res, next) {
    // next is a function we have to call in every single middleware function we ever write ever.
    if (req.session.signatureId) {
        //if signatureId exists, this if block will run!

        //this is my thank-you route
        res.redirect("/petition/signed");
    } else {
        next();
        //to let the user go on their way.
    }
}
