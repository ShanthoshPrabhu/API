const router = require('express').Router();
const comment = require('../models/commentModel')
const project = require('../models/projectModel');

  router.get('/', async (req, res) => {
    const projectID = req.query.ProjectID; 
    console.log('ProjectID', projectID);
    
    try {
    if(projectID){
        const singleComment = await comment.find({ "ProjectID": projectID });
        console.log('products', singleComment);
        res.status(200).json({
            error:false,
            data:singleComment
        });
    }
    else{
        const allComments = await comment.find({})
        console.log("all Comments", allComments)
        res.status(200).json({
            error:false,
            data: allComments
        })
    }
    } catch (err) {
      res.status(500).json({
        error:true,
        data:err
      });
    }
  });

  router.post('/', async (req, res) => {
  console.log("req>", req.body);
  const newComment = new comment(req.body);
  
  try {
    const response = await newComment.save();
    const commentID = response._id.toString(); 
    const ProjectID = response.ProjectID
    const updateProject = await comment.findOneAndUpdate(
      { "ProjectID": ProjectID },
      { $push: { Comments: commentID} },
      { new: true }
    );
    console.log(updateProject)
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
  router.delete('', async (req,res)=>{
    
   
    try {
       
      res.status(200).json("Comment has been removed...");
    } catch (err){
      res.status(500).json(err);
    }
  })
  router.delete('/:CommentID', async (req, res) => {
    const CommentID = req.params.CommentID;
    const projectID = req.query.ProjectID;
    
    try {
     
        await comment.findByIdAndDelete(CommentID)
      
      const updateProject = await project.findOneAndUpdate(
        { "ProjectID": projectID },
        { $pull: { Comments: CommentID } },
        { new: true }
      );
      
      res.status(200).json("Task has been removed");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //CommentID

  router.put('/:CommentID', async (req,res)=> {
    const CommentID = req.params.CommentID;
    const value = req.body
    console.log('value',value)
    const updateTask = await comment.findByIdAndUpdate(
        CommentID,
       value,
      { new: true }
    );
    res.status(200).json(updateTask);
  })

//   router.post('/postComment',async((req,res)=>{
//     const request = req.body
//   }))
  



module.exports = router