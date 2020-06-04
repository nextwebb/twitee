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
        res.status(400).json({
            status: false,
            data: 'Bad request!'
          });
    })
  }

exports.addComment = function(req, res) {
   let comment = new Comment(req.body);
   comment.add().then(
       (success) => {
     if(success){
         res.status(200).json({
            status: true,
            data: 'Comment added!'
   });
}
}).catch(err => {
    res.status(400).json({
        status: false,
        data: 'Bad request!'
      });
   })
  }