import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import userRouter from './router/userRouter.js'
dotenv.config()
const app = express()
app.use(express.json())
app.use('/api/usuarios', userRouter)


connectDB()
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server running in the port ${PORT}`)
})