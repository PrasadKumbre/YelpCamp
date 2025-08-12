if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

// Import route files
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const usersRoutes = require('./routes/user');

// Import additional middleware and utilities
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

// Initialize express app
const app = express();

app.set('query parser', 'extended');

// Connect to MongoDB 'mongodb://localhost:27017/yelp-camp'
//const mongoURL = process.env.MONGO_URL;
const mongoURL = 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(sanitizeV5({ replaceWith: '_' }));



// Use ejsMate as the template engine
app.engine('ejs', ejsMate);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware to support PUT and DELETE methods using query parameter
app.use(methodOverride('_method'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Morgan logger (optional, currently commented out)
// app.use(morgan('combined'));
const store = MongoStore.create({
    mongoUrl: mongoURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});


// Session configuration
const sessionConfig = {
    store,
    name : 'Session',
    secret: 'TheirShouldASecretKeyFromENVFill', // Use environment variable in production
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        //secure:true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Expires in 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7, // Max age is 7 days
    }
}

// Use session middleware
app.use(session(sessionConfig));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Use local strategy for Passport authentication
passport.use(new LocalStrategy(User.authenticate()));

// Configure Passport to serialize and deserialize users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use flash middleware for displaying messages
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.tiles.mapbox.com/",
    // "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    // "https://api.mapbox.com/",
    // "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/", // add this
];
const connectSrcUrls = [
    // "https://api.mapbox.com/",
    // "https://a.tiles.mapbox.com/",
    // "https://b.tiles.mapbox.com/",
    // "https://events.mapbox.com/",
    "https://api.maptiler.com/", // add this
];
const fontSrcUrls = [
    "https://cdn.jsdelivr.net",
];


    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: [],
                connectSrc: ["'self'", ...connectSrcUrls],
                scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
                styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
                workerSrc: ["'self'", "blob:"],
                objectSrc: [],
                imgSrc: [
                    "'self'",
                    "blob:",
                    "data:",
                    "https://res.cloudinary.com/doidrykx0/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                    "https://images.unsplash.com/",
                    "https://api.maptiler.com/",
                ],
                fontSrc: ["'self'", ...fontSrcUrls],
            },
        })
    );
    

// Middleware to make flash messages and current user available in all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// Use route files
app.use('/', usersRoutes); // User registration and login routes
app.use('/campgrounds', campgroundsRoutes); // Campground-related routes
app.use('/campgrounds/:id/reviews', reviewsRoutes); // Nested review routes for campgrounds

// Root route (home page)
app.get('/', (req, res) => {
    res.render('home');
})

// Error handling middleware
app.use((err, req, res, next) => {
    if (!err.message) err.message = 'Something went wrong :(';
    const { statusCode = 500, message = 'Something went wrong :(' } = err;
    res.status(statusCode).render('error', { err });
})

// 404 Not Found handler for unmatched routes
app.all(/(.*)/, (req, res, next) => {
    res.status(404);
    res.render('notfound');
})

// Start the server
app.listen(8080, () => {
    console.log(`Server is started on http://localhost:8080/`);
})