const jwt = require('jsonwebtoken')

exports.isLogin = (req, res, next) => {
    // const auth = req.headers['authorization']
    // if (auth == null) {
    //     res.status(401)
    //     return res.send("not authorized")
    // }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNlOWE4YmE1MmRlYmRiMGVhMTQ4Y2YiLCJuYW1lIjoiYW1yIiwiZW1haWwiOiJhbXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkNG5mRUNhTkg5OVBaQThZN0hROUZMT0RBTC9Xa05Ud09KcE1rZEdqSXFja1dsVGRvOFU3UlMiLCJjb25uZWN0aW9ucyI6W10sInNlbnRSZXF1ZXN0cyI6W10sInJlY2lldmVkUmVxdWVzdHMiOltdLCJfX3YiOjEsImlhdCI6MTY4MTgyNTYzNiwiZXhwIjoxNjgxOTEyMDM2fQ.J_ZOvMXUeudSR57BwyC2B841P0jxaejlir7MFv0YW_c"
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