
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const markdown = require('marked');
const csrf = require('csurf')
const app = express();
const sanitizeHTML = require("sanitize-html");
const moment = require('moment');
// const Pusher = require('pusher');

//boiler plate code
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', require('./router-api'))

let sessionOptions = session({
    secret: "Javascript is soooo coool",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000 * 60 * 60 * 24, httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash())

app.use(function(req, res, next) {
    // make our markdown function available within ejs templates
    res.locals.filterUserHTML = function(content) {
        return sanitizeHTML(markdown(content),{allowedTags: ["p", "br", "ul", "ol", "li", "strong", "bold", "i", "em", "h1", "h2", "h3", "h4", "h5", "h6"  ], allowedAttributes: [] })
    }

    res.locals.getTime = function(timeStamp){
        return moment(timeStamp).format("LLL");
    }

    // make all error and success flash messages available from all templates

    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")


    // make current user id available on the req object
    if (req.session.user) {req.visitorId = req.session.user._id} else {req.visitorId = 0}
    
    // make logged in user session data available from within view templates
    res.locals.user = req.session.user
    next()
  })
  
const router = require('./router');//it expects a file


//we use the express feature to serve static files as images,css files and js files.
app.use(express.static('public')); 
// const log =function(req,res, next) {
//     console.log("hello world");
//     next();
// }
// app.use('/about',log); 

app.set('views', './views');
app.set('view engine', 'ejs');
 //we want to use the ejs template engine

app.use(csrf()) //any request that modifies state must have a csrf token else it'll throw an error

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use('/', router); //Every time the app receives any http request to the base directory the variable router gets executed and added to the server.

app.use('/', function(err, req, res, next) {
    if(err){
        if(err.code == "EBADCSRFTOKEN") {
            req.flash('errors', 'Cross site request forgery detected.')
            req.session.save(() => res.redirect('/'))
        } else {
            res.render('404')
            console.log(err)
        }
    }

})

// let pusher = new Pusher({
//   appId: '1014954',
//   key: 'ffc30ab76f70ca939429',
//   secret: '5b9744c296ab6e7264b5',
//   cluster: 'eu',
// });

// pusher.trigger('my-channel', 'my-event', {
//   'message': 'hello world'
// });

module.exports = app; // so we're powering the entire server
