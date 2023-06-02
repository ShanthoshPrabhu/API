const router = require('express').Router();
const task = require('../models/taskModel');
const project = require('../models/projectModel');


router.get("/", async (req, res) => {
// console.log('req',req)  
const status= req.query.status
console.log('status',status)
    try {
      
      if(status){
       const taskQuery = await task.find({"Status":status})
       console.log('taskQuery',taskQuery)
       res.status(200).json(taskQuery)
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
      
      router.delete('/:TaskID', async (req, res) => {
        const TaskID = req.params.TaskID;
        const projectID = req.query.ProjectID;
        
        try {
         
          await task.findOneAndDelete({ "TaskID": TaskID });
          
          const updateProject = await project.findOneAndUpdate(
            { "ProjectID": projectID },
            { $pull: { Tasks: TaskID } },
            { new: true }
          );
          
          res.status(200).json("Task has been removed");
        } catch (err) {
          res.status(500).json(err);
        }
      });
      

      router.put('/:TaskID', async (req,res)=> {
        const TaskID = req.params.TaskID;
        const value = req.body
        console.log('value',value)
        const updateTask = await task.findOneAndUpdate(
          { "TaskID": TaskID },
           value,
          { new: true }
        );
        res.status(200).json(updateTask);
      })

module.exports = router