import { Router } from 'express'
import {
    addTask,
    changeTask,
    deleteTask,
    getTask,
    updateTask
} from '../controllers/taskProject.js'
import checkAuth from '../middleware/checkAuth.js'
const router = Router()

router.post('/', checkAuth, addTask)
router
    .route('/:id')
    .get(checkAuth, getTask)
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask)
router.post('/estado/:id', checkAuth, changeTask)

export default router