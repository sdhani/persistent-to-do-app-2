// const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars'); /* optimized handlebars for nodejs/express */
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); /* middleware; parse response body */
const logger = require('morgan'); /* dev tools */
const dotenv = require('dotenv');

dotenv.config();
const app = express();

/* Import Routes */
const INDEX_ROUTES = require("./routes/index");
const LOGIN_ROUTES = require("./routes/login");
const TODO_ROUTES = require("./routes/todo");
const USERS_ROUTES = require("./routes/users");

/* Set view engine */
app.engine('hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/* Mount Routes */
app.use("/", INDEX_ROUTES);
app.use("/login", LOGIN_ROUTES);
app.use("/todo", TODO_ROUTES);
app.use("/users", USERS_ROUTES);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
