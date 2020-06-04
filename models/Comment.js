const commentsCollection = require('../db').db().collection("comments")
const ObjectID = require('mongodb').ObjectID

let Comment = function(data ) {
    if (data == undefined) {data = false} //prevents errors
  if (data) {
    this.data = data
  } 
}

Comment.prototype.cleanup = function(){

    this.data = {
        authorid: new ObjectID(this.data.authorId),
        comment: this.data.guestComment.trim().toLowerCase(),
        guestId: new ObjectID(this.data.guestId) ,
        createdDate: new Date(),
    }
}

Comment.prototype.add = function(){
    return  new Promise((resolve, reject) => {
        // add comment and guestId to comments document
        commentsCollection.insertOne(this.data)
        .then((res) => {
            resolve(res)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

Comment.getCommentsById = function(id){
    return  new Promise(async (resolve, reject) => {
        try {
            let comments = await commentsCollection.aggregate([
              {$match: {authorId:  id}},
              {$lookup: {
                  from: "users",
                  localField: "guestId", foreignField: "_id",
                  as: "userDoc"
                }
            },
              {$project: {
                guestComment : 1 ,
                username: {$arrayElemAt: ["$userDoc.username", 0]},
                email: {$arrayElemAt: ["$userDoc.email", 0]
            }
              }}
            ]).toArray()
            resolve(comments)
          } catch(error) {
            reject(error)
          }
       
    })
}


module.exports = Comment;