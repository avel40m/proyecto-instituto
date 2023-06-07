var express = require('express');
const { index, searchCourse, allCourses, detailsCourse, sendMessage } = require('../controller/courseController');
var router = express.Router();

/* GET home page. */
router.get('/', index);

router.post('/search-course',searchCourse);

router.get('/all-courses',allCourses);

router.get('/detail-course/:id', detailsCourse);

router.post('/send-message', sendMessage);

module.exports = router;
