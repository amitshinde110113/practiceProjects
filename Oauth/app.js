var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
const http = require('http');
const passport = require('passport');
require('./passport');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(cors());
app.use(express.static(__dirname + '/client/dist/client'));
const fs = require('fs')
app.use(passport.initialize());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function (req, res) {
  const indexPath = path.resolve(`${__dirname}/client/dist/client/index.html`);
  try {
    if (fs.existsSync(indexPath)) {
      //file exists
      res.sendFile(indexPath);
    } else {
      res.json({
        service: `Client not exist`,
        message: 'please do npm run client:watch'
      });
    }
  } catch (err) {
    
  }
  console.log('indexPath', indexPath)

  // res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});


app.get('/login/:id',passport.authenticate('google', { scope: ['profile', 'email'] }),(req,res,next)=>{
  
});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    res.redirect('/profile');
  }
);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(port, function () {
  console.log(`listening on ${port}`);
});
module.exports = app;
