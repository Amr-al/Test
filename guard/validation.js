const jwt = require('jsonwebtoken')

exports.isLogin = (req, res, next) => {
     const auth = req.headers['authorization']
     if (auth == null) {
        res.status(401)
         return res.send("not authorized")
     }
     const token = auth.split(' ')[1]
    if (token == null) {
        res.status(401)
        return res.send("not authorized")
    }
    jwt.verify(token, 'HS256', (err, user) => {
        if (err) {
            res.status(401)
            return res.send("expired token")
        }
        if (user.user){
            if(Array.isArray(user.user)) req.user=user.user[0]
            else req.user = user.user
        }
        else req.user = user
        next()
    })
}