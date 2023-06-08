import Task from "../models/Task.js"
import Project from '../models/Project.js'

export const addTask = async (req, res) => {
    const { project } = req.body
    const existProject = await Project.findById(project)

    if (!existProject) {
        const error = new Error('Project does not exit')
        return res.status(404).json({ msg: error.message })
    }
    if (existProject.creator.toString() !== req.user._id.toString()) {
        const error = new Error('you dont have permmision by added task')
        return res.status(404).json({ msg: error.message })
    }
    try {
        const taskStored = await Task.create(req.body)
        res.json(taskStored)
    } catch (error) {
        console.log(error)
    }

}
export const getTask = async (req, res) => {

}
export const updateTask = async (req, res) => {

}
export const deleteTask = async (req, res) => {

}
export const changeTask = async (req, res) => {

}