const likeCollection = require('../db').db().collection("likes")
const ObjectID = require('mongodb').ObjectID

let Like = function(data) {
    // data.guestId
    // data.postId
    // data.authorId
    if (data == undefined) {data = false} //prevents errors
    if (data) {
      this.data = data
    } 
  }

Like.prototype.likeNow =  function() {
    // check if guestId exist already inserted to a like doc
    // if not 
// insert to like collection
// else 
// dont insert just return
}

Like.prototype.unLikeNow = function() {
// check if guest exist then unlike
// else just return 
}