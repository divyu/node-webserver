// Routing refers to determining how an application responds to a client request to a particular endpoint,
// which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

// Route definition takes the following structure:
//
// app.METHOD(PATH, HANDLER)
// Where:
//
// app is an instance of express.
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.
const express = require('express');
const hbs = require('hbs');
var app = express() ;     // app is an instance of express.
app.use((req, res, next)=>{
  var now = new Date().toString();
  console.log(`${now} : ${req.method} and ${req.path}`);
//   req.method
// Contains a string corresponding to the HTTP method of the request: GET, POST, PUT, and so on.
  next();
});
// maintanence.hbs
// now our webpage always display maintainence period message, as we have changed the middleware to show it always.
app.use((req , res , next)=>{
  res.render('maintain.hbs',{
    msg:'Sorry for the in-convenience'
  });
});

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getcurrentyear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt' , (text)=>{
  return text.toUpperCase();
});
// app.get('/' , (req , res)=>{
//   res.send('<h2>Hello world </h2>');
// });
app.get('/about' , (req , res)=>{
  // res.send({
  //   name:'Divyanshu Gautam',
  //   class : 'COE-1',
  //   roll : 252
  // });
  res.render('about.hbs' ,{
    //currentyear :  new Date().getFullYear(),
    currentpage : ' About hbs '
  });
});
app.get('/' , (req , res)=>{
  res.render('home.hbs' ,{
    //currentyear : new Date().getFullYear(),
    currentpage : ' Home hbs '
  });
});
app.get('/bad' , (req ,res)=>{
    res.send({
      error: 'Error , Page not found 404!'
    });
});
// we use app.use to access middleware.
// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//
// The function signature is:
//
// express.static(root, [options])
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public1'));
app.listen(3000 ,()=>{
  console.log('Listening to port 3000');
});
