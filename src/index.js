const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app=express();
app.use(cors());
const mongoDB = require('./DBConnect')

mongoDB.connectDB();


app.use(express.json())

const projectRoute = require('../routes/projectRoute');
const commentRoute = require('../routes/commentRoute');
const taskRoute = require('../routes/taskRoute')


app.use('/v1/projects',projectRoute)
app.use('/v1/comments',commentRoute)
app.use('/v1/tasks',taskRoute)


app.listen(process.env.HOST,()=>{
    console.log(`connected to ${process.env.HOST}`)
})