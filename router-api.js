const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const commentsController = require('./controllers/commentsController')
const cors = require('cors')

// httponly and secure https option prevents XXS attacks

// Using cookies + jwt i'm prone too to CSRF attacks
 
// Increase CSRF protection by restricting  Origin access

apiRouter.use(cors())


apiRouter.get('/v1/comments/all/:authorId', commentsController.getAllComments)

apiRouter.post('/v1/comments/add', commentsController.addComment)

module.exports = apiRouter; 