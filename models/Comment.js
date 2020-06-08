const commentsCollection = require('../db').db().collection("comments")
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');


let Comment = function(data ) {
    if (data == undefined) {data = false} //prevents errors
  if (data) {
    this.data = data
  } 
}

Comment.prototype.cleanUp = function(){
  const hex = /[0-9A-Fa-f]{6}/g;
    this.data = {   
        postId:   (hex.test(this.data.postId))? ObjectID( this.data.postId) :  this.data.postId,
        comment: this.data.guestComment.trim().toLowerCase(),
        guestId:  (hex.test( this.data.guestId))? ObjectID( this.data.guestId) :  this.data.guestId,
        createdDate:  moment(new Date()).format("LLL")
    }
}

Comment.prototype.add = function(){
    return  new Promise((resolve, reject) => {
       this.cleanUp()
        // add comment and guestId to comments document
        commentsCollection.insertOne(this.data)
        .then((res) => {
            resolve(res.insertedId)
            
        })
        .catch((err) => {
            reject(err)
            console.log(err)
        })
    })
}

Comment.getCommentsById = function(id){
    return  new Promise(async (resolve, reject) => {
        try {
            let comments = await commentsCollection.aggregate([
              {$match: {postId: new ObjectID(id)}},
              { $sort : { createdDate : -1 } },
              {$lookup: {
                  from: "users",
                  localField: "guestId", 
                  foreignField: "_id",
                  as: "userDoc"
                }
            },
              {$project: {
                comment : 1 ,
                createdDate : 1 ,
                username: {$arrayElemAt: ["$userDoc.username", 0]},
                email: {$arrayElemAt: ["$userDoc.email", 0]
            }
              }}
            ]).toArray()
            resolve(comments)
          } catch(error) {
            console.log(error)
            reject(error)
          }
       
    })
}


module.exports = Comment;