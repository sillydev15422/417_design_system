const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    let accessToken = req.cookies.jwt;
    if(!accessToken){
        await res.clearCookie("jwt");
        return res.redirect('/login');
    }

    try {
        let isAuth = jwt.verify(accessToken,'longest secreate key node admin');
        if(!isAuth.auth){
            return res.redirect('/login');    
        }
        next();   
    } catch (error) {
        await res.clearCookie("jwt");
        return res.redirect('/login');
    }  
}