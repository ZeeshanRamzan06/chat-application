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

const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true, // Allow credentials (cookies, etc.)
  };
app.use(cors(corsOptions));

app.use('/api/auth',authRoutes )
app.use('/api/messages', messageRoutes )

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
    connectDb()
})