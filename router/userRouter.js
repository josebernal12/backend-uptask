import { Router } from 'express'
import {
    authenticate,
    createUser,
    deleteUser,
    getUser,
    updateUser
} from '../controllers/usercontroller.js'

const router = Router()

router.get('/', getUser)
router.post('/', createUser)
router.post('/login', authenticate)
router.put('/', updateUser)
router.delete('/', deleteUser)



export default router