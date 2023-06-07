import { Router } from 'express'
import {
    authenticate,
    checkPassword,
    confirmed,
    createUser,
    // deleteUser,
    forgotPassword,
    newPassword,
    profile,
    // getUser,
    // updateUser
} from '../controllers/usercontroller.js'
import checkAuth from '../middleware/checkAuth.js'

const router = Router()

// router.get('/', getUser)
router.post('/', createUser)
router.post('/login', authenticate)
router.get('/confirmar/:token', confirmed)
router.post('/olvide-password', forgotPassword)
router.route('/olvide-password/:token').get(checkPassword).post(newPassword)


router.get('/perfil', checkAuth, profile)

// router.put('/', updateUser)
// router.put('/', updateUser)
// router.delete('/', deleteUser)



export default router