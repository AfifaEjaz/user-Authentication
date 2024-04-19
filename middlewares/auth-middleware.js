import jwt from 'jsonwebtoken'
import user from '../user/model.js'

var checkUserAuth = async(req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]

            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET)
            console.log(userID);

            //get user from token
            req.user = await user.findById(userID).select("-password")
            console.log(req.user);
            next()
        } catch (error) {
            console.error(error);
            return res.status(401).send("Unauthorized user");
        }
    }
    if(!token){
        return res.status(401).send("No token");
    }
}

export default checkUserAuth