const db = require("../data/db");
const fs = require('fs');
const path = require('path');

const getAllCourses = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const query = 'SELECT co.id,co.title,ca.title AS category FROM incluyeme.courses co inner join incluyeme.category ca on co.category_id=ca.id;'
    db.query(query, (err, results) => {
        if (err) return res.redirect('/');

        res.render('admin/courses', { permission: cookie, courses: results });
    })
}

const getCreateCourse = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const query = 'SELECT * FROM category;'
    db.query(query, (err, results) => {
        if (err) return res.redirect('admin/courses', { permission: cookie });
        res.render('admin/createCourse', { permission: cookie, categories: results });
    })
}

const postCreateCourse = (req, res) => {

    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { title, category, description, enabled, start, state } = req.body;
    const image = '/' + req.file.destination.split('/')[1] + '/' + req.file.filename

    const query = `INSERT INTO courses (title,description,enabled,image,start,state,category_id) VALUES 
        ('${title}','${description}','${enabled}','${image}','${start}','${state}',${parseInt(category)});`

    db.query(query, (err, results) => {
        if (err) res.redirect('/create-course');
        res.redirect('/courses')
    })
}

const getUpdateCourse = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `SELECT co.id,co.title,co.description,co.enabled,co.image,co.start,co.state,ca.id as categoryId,ca.title as category FROM incluyeme.courses co inner join incluyeme.category ca on co.category_id=ca.id where co.id = ${id};`
    db.query(query, (err, results1) => {
        if (err) {
            return res.redirect('/courses');
        }
        let month = (results1[0].start.getMonth() + 1 < 10) ? `0${results1[0].start.getMonth() + 1}` : results1[0].start.getMonth() + 1
        let year = results1[0].start.getFullYear();
        let date = results1[0].start.getDate();
        const dateStart = `${year}-${month}-${date}`

        db.query('SELECT * FROM category;', (err, results2) => {
            if (err) {
                return res.redirect('/courses');
            }
            res.render('admin/updateCourse',
                { permission: cookie, course: results1, categories: results2, fecha: dateStart });
        })
    })

}

const postUpdateCouse = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }

    const { id,title, category, description, enabled, start, state,imagesAncient } = req.body;
 
    if (req.file === null || req.file === undefined) {
        let updateCourse = `UPDATE courses SET start='${start}', title='${title}',category_id=${parseInt(category)},enabled=${enabled},state='${state}',description='${description.trim()}' WHERE id=${id};`
        db.query(updateCourse,(err,results) => {
            if(err) {
                console.log(err);
                return res.redirect('/course')
            }
            return res.render('/course',{permission:cookie})
        })
    } else {
        const deleteImage = path.join(__dirname,'..','public',imagesAncient);
        fs.unlink(deleteImage,(err) => {
            if (err) console.log(err);
            console.log('Archivo eliminado');
        })
        const image = '/' + req.file.destination.split('/')[1] + '/' + req.file.filename
        
        let updateCourse = `UPDATE courses SET image='${image}', start='${start}', title='${title}',category_id=${parseInt(category)},enabled=${enabled},state='${state}',description='${description.trim()}' WHERE id=${id};`
        db.query(updateCourse,(err,results) => {
            if(err) {
                console.log(err);
                return res.redirect('/course')
            }
            return res.render('/course',{permission:cookie})
        })
        

    }
    res.redirect('/courses');
}

const viewCourse = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `SELECT co.id,co.title,co.description,co.enabled,co.image,co.start,co.state,ca.title as category FROM incluyeme.courses co inner join incluyeme.category ca on co.category_id=ca.id where co.id = ${id};`
    db.query(query, (err, results) => {
        if (err) return res.redirect('/courses');
        res.render('admin/viewCourse', { permission: cookie, course: results });
    })
}

const deleteCourse = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `SELECT image FROM courses WHERE id=${id};`;
    db.query(query, (err, results) => {
        if (err) console.log(err);
        let images = results[0].image
        const pathImage = path.join(__dirname, '..', 'public', 'images', images);

        fs.unlink(pathImage, (err) => {
            if (err) console.log(err);
            console.log('Archivo eliminado');
        })
    })
    const deleteById = `DELETE FROM courses WHERE id=${id}`;
    db.query(deleteById, (err, results) => {
        if (err) console.log(err);
    })

    res.redirect('/courses');
}

const getAllCategory = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const query = 'SELECT * FROM category';
    db.query(query, (err, results) => {
        if (err) return res.redirect('/');
        res.render('admin/category', { permission: cookie, categories: results });
    })
}

const getCategory = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    res.render('admin/createCategory', { permission: cookie });
}

const postCategory = (req, res) => {
    const { title } = req.body;

    const query = `INSERT INTO category (title) VALUES ('${title}');`
    db.query(query, (err, results) => {
        if (err) res.redirect('/create-category')

        res.redirect('/category');
    })
}

const getUpdateCategory = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `SELECT * FROM category WHERE id = ${id};`
    db.query(query, (err, results) => {
        if (err) res.redirect('/category', { permission: cookie });
        res.render('admin/updateCategory', { permission: cookie, category: results });
    })
}

const postUpdateCategory = (req, res) => {
    const { id, title } = req.body;
    const query = `UPDATE category SET title='${title}' WHERE id = ${id};`
    db.query(query, (err, results) => {
        if (err) res.redirect('/category');
        res.redirect('/category');
    })
}

const deleteCategory = (req, res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `DELETE FROM category WHERE id = ${id}`;
    db.query(query, (err, results) => {
        if (err) res.redirect('/category');
        res.redirect('/category');
    })
}

const getMessageNotRead = (req,res) => {
    const query = 'SELECT count(id) as mensajes FROM comments c where c.read = 0;'
    db.query(query,(err,results) => {
        if(err) return res.status(404).json('-');
        return res.status(200).json({valor:results,cookie: req.cookies.miCookie});
    })
}

const getMessage = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const query = 'SELECT * FROM comments co order by co.read;'
    db.query(query,(err,results) => {

        res.render('admin/messages', { permission: cookie,messages:results});
    })
}

const deleteMessage = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `DELETE FROM comments WHERE id = ${id}`;
    db.query(query,(err,results) => {
        return res.redirect('/message');
    })
}

const updateMessages = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;

    const query = `UPDATE comments co SET co.read = 1  WHERE id = ${id};`
    db.query(query,(err,results) => {
        if(err) return res.status(404).json({message: err});

        return res.status(204)
    })
}

const showStudents = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'admin') {
        return res.redirect('/',);
    }
    const { id } = req.params;
    const query = `select id,last_name,first_name,city,province,email from data_personal where user_id IN (select user_id from users_courses uc where uc.course_id = ${id});`;
    db.query(query,(err,results) => {
        if(err) return res.redirect('/course');

        return res.render('admin/showstudent',{permission:cookie,students:results});
    })
}


module.exports = {
    getAllCourses,
    getCreateCourse,
    postCreateCourse,
    getAllCategory,
    getCategory,
    postCategory,
    getUpdateCourse,
    postUpdateCouse,
    viewCourse,
    deleteCourse,
    getUpdateCategory,
    postUpdateCategory,
    deleteCategory,
    getMessageNotRead,
    getMessage,
    deleteMessage,
    updateMessages,
    showStudents,
};