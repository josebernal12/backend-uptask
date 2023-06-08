import { Router } from 'express'
import checkAuth from '../middleware/checkAuth.js'
import {
    addCollaborators,
    deleteCollaborators,
    deleteProject,
    getProject,
    getProjects,
    getTasks,
    newProject,
    updateProject
} from '../controllers/projectController.js'

const router = Router()

router
    .route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject);

router.route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject);

router.get('tareas/:id', checkAuth, getTasks);
router.post('/agregar-colaborador/:id', checkAuth, addCollaborators)
router.post('/eliminar-colaborador/:id', checkAuth, deleteCollaborators)

export default router