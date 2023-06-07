import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import user from "../models/User.js"


export const getUser = async (req, res) => {
    res.json({ msg: 'desde get' })
}
export const createUser = async (req, res) => {

    //eviar registros duplicados 
    const { email } = req.body;
    const existUser = await user.findOne({ email })
    if (existUser) {
        const error = new Error('User already register ')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const userCreated = new user(req.body)
        userCreated.token = generateId()
        const userStored = await userCreated.save()
        res.json({ msg: userStored })
    } catch (error) {
        console.log(error)
    }
}

export const authenticate = async (req, res) => {
    const { email, password } = req.body
    //comprobar si el usuario existe
    const existUser = await user.findOne({ email })
    if (!existUser) {
        const error = new Error('User does not exist')
        return res.status(400).json({ msg: error.message })

    }
    //comprobar que el usuario este confirmado
    if (!existUser.confirmed) {
        const error = new Error('User does not confirmed')
        return res.status(400).json({ msg: error.message })
    }
    //comprobar su password

    if (await existUser.checkPassword(password)) {
        res.json({
            id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            token: generateJWT(existUser._id)
        })
    } else {
        const error = new Error('password incorrect')
        return res.status(400).json({ msg: error.message })

    }
}
export const confirmed = async (req, res) => {

    const { token } = req.params
    const userToken = await user.findOne({ token })
    if (!userToken) {
        const error = new Error('token no valid')
        return res.status(400).json({ msg: error.message })
    }

    try {
        userToken.confirmed = true
        userToken.token = ''
        await userToken.save()
        res.json({ msg: 'user confirmed correctly' })
    } catch (error) {
        console.log(error)
    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body
    const existUser = await user.findOne({ email })
    if (!existUser) {
        const error = new Error('User does not register ')
        return res.status(400).json({ msg: error.message })
    }
    try {
        existUser.token = generateId()
        await existUser.save()
        res.json({ msg: 'we have sent an email with instructions' })
    } catch (error) {
        console.log(error)
    }

}

export const checkPassword = async (req, res) => {

    const { token } = req.params

    const tokenValid = await user.findOne({ token })
    if (tokenValid) {
        res.json({ msg: 'Token Valid' })
    } else {
        const error = new Error('token no valid ')
        return res.status(400).json({ msg: error.message })
    }
}

export const newPassword = async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    const userDB = await user.findOne({ token })
    if (userDB) {
        userDB.password = password
        userDB.token = ''
        try {
            await userDB.save()
            res.json({ msg: 'user modified correctly' })
        } catch (error) {
            console.log('error')
        }
    } else {
        const error = new Error('token no valid ')
        return res.status(400).json({ msg: error.message })
    }



}

export const profile = async (req, res) => {
    const { user } = req
    res.json(user)
}

// export const updateUser = async (req, res) => {
//     res.json({ msg: 'desde update' })
// }
// export const deleteUser = async (req, res) => {
//     res.json({ msg: 'desde delete' })
// }