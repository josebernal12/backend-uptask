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

}
export const updateProject = async (req, res) => {

}
export const deleteProject = async (req, res) => {
}
export const addCollaborators = async (req, res) => {

}
export const deleteCollaborators = async (req, res) => {

}
export const getTask = async (req, res) => {

}