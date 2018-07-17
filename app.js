const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const celebritiesRouter = require('./routes/celebrities.routes.js');
const commentsRouter = require('./routes/comments.routes.js');
const usersRouter = require('./routes/users.routes.js');
const sessionsRouter = require('./routes/sessions.routes.js');

const app = express();

require('./configs/db.config');
require('./configs/hbs.config');

require('./configs/session.config')(app);
require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/celebrities', celebritiesRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/', (req, res) => {
  res.redirect('/celebrities')
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
