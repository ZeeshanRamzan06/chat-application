import express, { json } from "express";
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDb } from "./lib/db.js";
dotenv.config();
const app = express();
app.use(json())
app.use('/api/auth',authRoutes )

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
    connectDb()
})