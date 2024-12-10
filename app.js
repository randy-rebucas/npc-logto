require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
const { LogtoExpress } = require('@logto/express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoutes = require('./routes/auth');
var membersRouter = require('./routes/members');

var app = express();

/**
 * Logto Configuration
 */
const logtoConfig = {
  appId: process.env.LOGTO_APP_ID,
  appSecret: process.env.LOGTO_APP_SECRET,
  endpoint: process.env.LOGTO_ENDPOINT,
  baseUrl: process.env.BASE_URL, // Your application base URL
  cookieSecret: process.env.COOKIE_SECRET, // Secret for cookie signing
  cookieSecure: process.env.NODE_ENV === 'production', // Use secure cookies in production
};

const logto = new LogtoExpress(logtoConfig);

/**
 * CORS
 */
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// remove default powered by on header
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("> Database error:", error);
});
db.once("open", () => {
    console.log("> Successfully connected to database");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Logto middleware before routes
app.use(logto.middleware());

// Public routes
app.use('/', indexRouter);
app.use('/auth', authRoutes);

// Protected routes
app.use('/users', logto.requireAuth(), usersRouter);
app.use('/members', logto.requireAuth(), membersRouter);

// Add Logto user info to res.locals for views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Add some useful Logto endpoints
app.get('/api/auth/user', logto.requireAuth(), (req, res) => {
  res.json({
    user: req.user,
    claims: req.claims,
  });
});

app.post('/api/auth/sign-out', logto.requireAuth(), async (req, res) => {
  try {
    await req.logto.signOut();
    res.status(200).json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign-out error:', error);
    res.status(500).json({ error: 'Failed to sign out' });
  }
});

// Add this before your error handlers
app.use((err, req, res, next) => {
  if (err.name === 'LogtoError') {
    console.error('Logto error:', err);
    return res.status(401).json({ error: 'Authentication failed' });
  }
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
