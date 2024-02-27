// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const isAuthenticated = require('./authMiddleware');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', './views'); // Set the views directory
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');
const editProfileRouter = require('./routes/edit-profile');
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/admin', isAuthenticated, adminRoute); // Protected route
app.use('/', indexRoute);
app.use('/edit-profile', isAuthenticated, editProfileRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
