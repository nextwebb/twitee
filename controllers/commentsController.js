const Comment = require('../models/Comment'); 

exports.getAllComments = function(req, res) {
    //console.log(req.params.authorId)
    Comment.getCommentsById(req.params.authorId).then((data) => {
        if(data){
            res.status(200).json({
               status: true,
               data 
      })
   }
    }).catch(err => {
      console.log(err)
        res.status(400).json({
            status: false,
            data: 'Bad request!'
          });
    })
  }

exports.addComment = function(req, res) {
   let comment = new Comment(req.body);
   comment.add().then(
       (response) => {
     if(response){
         res.status(200).json({
            status: true,
            data: {
              id: response,
              message:'comment added!'
            }
   });
}
}).catch(err => {
  console.log(err)
    res.status(400).json({
        status: false,
        data: 'Bad request!'
      });
   })
  }