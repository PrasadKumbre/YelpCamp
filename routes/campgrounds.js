const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware/auth');
const { validateCampground } = require('../middleware/campground');
const campground = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudnary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campground.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.addCampground))
    
    
router.get('/new', isLoggedIn, campground.newForm);

router.route('/:id')
    .get(catchAsync(campground.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.EditCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.DeleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.showCampgroundEditForm));

module.exports = router; 