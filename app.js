const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET || 'campus-eats-development-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);


app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});

