import mongoose from 'mongoose'
import Project from '../models/Project.js'
export const getProjects = async (req, res) => {

    const project = await Project.find().where('creator').equals(req.user)
    res.json(project)

}
export const newProject = async (req, res) => {
    const project = new Project(req.body)
    project.creator = req.user._id

    try {
        const projectStored = await project.save()
        res.json(projectStored)
    } catch (error) {
        console.log(error)
    }

}

export const getProject = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id)
    if (!valid) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    const project = await Project.findById(id)
    if (!project) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('action no valid ')
        return res.status(400).json({ msg: error.message })
    }
    res.json(project)
}
export const updateProject = async (req, res) => {
    const { id } = req.params;

    const valid = mongoose.Types.ObjectId.isValid(id)
    if (!valid) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    const project = await Project.findById(id)
    if (!project) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('action no valid ')
        return res.status(400).json({ msg: error.message })
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.deliverDate = req.body.deliverDate || project.deliverDate;
    project.client = req.body.client || project.client;

    try {
        const projectStored = await project.save()
        res.json(projectStored)
    } catch (error) {
        console.log(error)
    }

}
export const deleteProject = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id)
    if (!valid) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    const project = await Project.findById(id)
    if (!project) {
        const error = new Error('not found ')
        return res.status(400).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
        const error = new Error('action no valid ')
        return res.status(400).json({ msg: error.message })
    }
    try {
        await project.deleteOne();
        res.json({ msg: 'project deleted' })
    } catch (error) {
        console.log(error)
    }

}
export const addCollaborators = async (req, res) => {

}
export const deleteCollaborators = async (req, res) => {

}
export const getTasks = async (req, res) => {

}