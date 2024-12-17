import express, { json } from "express";
import dotenv from 'dotenv'
import { connectDb } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cors from 'cors'

dotenv.config();
const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    Credential: true
}))

app.use('/api/auth',authRoutes )
app.use('/api/message', messageRoutes )

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
    connectDb()
})