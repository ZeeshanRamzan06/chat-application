import express from "express";

const app = express();

app.use('/api/auth',authRoutes )

app.listen(5000 , ()=>{
    console.log('Server is running on 5000')
})