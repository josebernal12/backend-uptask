import jwt from 'jsonwebtoken'
import user from '../models/User.js';
const checkAuth = async (req, res, next) => {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await user.findById(decoded.id).select('-password -confirmed -token -createdAt -updatedAt -__v')
            console.log(req.user)
            return next()
        } catch (error) {
            return res.status(404).json({ msg: 'there was a mistake' })

        }
    }
    if (!token) {
        const error = new Error('Token no valid')
        res.status(401).json({ msg: error.message })
    }
    next()
}

export default checkAuth