const router = require('express').Router();
const project = require('../models/projectModel');
// const mongoDB = require('../src/DBConnect')
// mongoDB.connectDB()

router.get("/", async (req, res) => {
// console.log('req',req)  
    try {
      const allProjects =await project.find({})
      console.log('products',allProjects)
      res.status(200).json(allProjects)
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/:ProjectID", async (req, res) => {
  console.log('req',req.params.ProjectID)  
  const ProjectID = req.params.ProjectID;
  console.log('nn',ProjectID)
      try {
        const singleProject = await project.find({"ProjectID":ProjectID});
        console.log('products',singleProject)
        res.status(200).json(singleProject)
      } catch (err) {
        res.status(500).json(err);
      }
});
    
router.post('/',async (req,res) => {
  console.log("req>",req.body)
   const newProject = new project(req.body);
try {
  const response = await newProject.save();
  res.status(200).json(response);
} catch (err) {
  res.status(500).json(err);
}
})

router.delete('/:ProjectID', async (req,res)=>{
  const ProjectID = req.params.ProjectID;
 
  try {
     await project.findOneAndDelete({"ProjectID":ProjectID});
    res.status(200).json("Project has been removed...");
  } catch (err){
    res.status(500).json(err);
  }
})

router.put('/:ProjectID', async (req,res)=> {
  const ProjectID = req.params.ProjectID;
  const value = req.body
  console.log('value',value)
  const updateProject = await project.findOneAndUpdate(
    { "ProjectID": ProjectID },
     value,
    { new: true }
  );
  res.status(200).json(updateProject);
})

module.exports = router