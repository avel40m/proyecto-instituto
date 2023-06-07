var express = require('express');
var router = express.Router();
const { signupCourse, mycourses, outCourse, getUpdateDataPersonal, putUpdateDataPersonal, checkData } = require("../controller/clientCourse");

router.post('/singup-course/:id', signupCourse);

router.get('/my-courses', mycourses);

router.delete('/delete-course/:id',outCourse);

router.get('/datapersonal',getUpdateDataPersonal);

router.put('/datapersonal',putUpdateDataPersonal);

module.exports = router;
