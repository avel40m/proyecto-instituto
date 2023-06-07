const {getAllCourses,getAllCategory, getCategory, postCategory, deleteCategory, getUpdateCategory, postUpdateCategory, getCreateCourse, postCreateCourse, viewCourse, deleteCourse, getUpdateCourse, postUpdateCouse, getMessageNotRead, getMessage, updateMessages, deleteMessage, showStudents} = require("../controller/adminController");
const upload = require("../helper/Multer");

const router = require("express").Router();

router.get('/courses', getAllCourses);

router.get('/create-course', getCreateCourse);

router.post('/create-course', upload.single('image') , postCreateCourse);

router.get('/update-course/:id', getUpdateCourse);

router.post('/update-course',upload.single('image') , postUpdateCouse);

router.get('/view-course/:id', viewCourse);

router.get('/delete-couse/:id', deleteCourse);

router.get('/category', getAllCategory);

router.get('/create-category', getCategory);

router.post('/create-category', postCategory);

router.get('/update-category/:id', getUpdateCategory);

router.post('/update-category', postUpdateCategory);

router.get('/delete-category/:id', deleteCategory);

router.get('/get-message-read', getMessageNotRead);

router.get('/message',getMessage);

router.get('/delete-message/:id',deleteMessage);

router.put('/message/:id', updateMessages);

router.get('/show-students/:id',showStudents);


module.exports = router;