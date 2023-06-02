const router = require('express').Router();
const task = require('../models/taskModel');
const project = require('../models/projectModel');

router.get("/", async (req, res) => {
// console.log('req',req)  
const status= req.query.status
console.log('status',status)
    try {
      
      if(status){
       const res = await task.find({"Status":status})
       console.log('res',res)
       res.status(200).json(res)
      } else {
        const allTasks =await task.find({})
        console.log('products',allTasks)
        res.status(200).json(allTasks)
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/:TaskID", async (req, res) => {
  console.log('req',req.params.TaskID)  
  const TaskID = req.params.TaskID;
  console.log('nn',TaskID)
      try {
        const singleTask = await task.find({"TaskID":TaskID});
        console.log('products',singleTask)
        res.status(200).json(singleTask)
      } catch (err) {
        res.status(500).json(err);
      }
    });
    

    router.post('/',async (req,res) => {
        console.log("req>",req.body)
        const ProjectID = req.body.ParentProjectID;
      const newTask = new task(req.body);
      try {
        const response = await newTask.save();
        const newTaskID = response.TaskID
        const updateProject = await project.findOneAndUpdate({"ProjectID":ProjectID},   { $push: { Tasks: newTaskID } },
        { new: true })
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json(err);
      }
      })
      
      router.delete('/:TaskID', async (req,res)=>{
        const TaskID = req.body.ProjectID;
       
        try {
           await project.findOneAndDelete({"TaskID":TaskID});
          res.status(200).json("Task has been removed...");
        } catch (err){
          res.status(500).json(err);
        }
      })

module.exports = router