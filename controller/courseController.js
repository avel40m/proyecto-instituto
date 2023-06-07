const db = require("../data/db");

const index = function (req, res, next) {
  let cookie = req.cookies.miCookie;
  if (cookie == undefined) {
    cookie = null;
  }
  const query = 'SELECT co.id,co.title,co.description,co.image,ca.title as category FROM courses co inner join category ca on co.category_id = ca.id where co.enabled = 1 order by rand() limit 6;';
  db.query(query, (err, results) => {
    if (err) console.log(err);
    res.render('index', { permission: cookie, courses: results });
  })
}

const searchCourse = (req, res) => {
  let cookie = req.cookies.miCookie;
  if (cookie == undefined) {
    cookie = null;
  }
  const { title } = req.body;
  const query = `SELECT co.id,co.title,co.description,co.image,ca.title as category FROM courses co inner join category ca on co.category_id = ca.id where co.title like '%${title}%'  and co.enabled = 1;`
  db.query(query, (err, results) => {
    if (err) console.log(err);
    res.render('searchcourse', { permission: cookie, courses: results });
  })
}

const allCourses = (req, res) => {
  let cookie = req.cookies.miCookie;
  if (cookie == undefined) {
    cookie = null;
  }

  const query = `SELECT co.id,co.title,co.description,co.image,ca.title as category FROM courses co inner join category ca on co.category_id = ca.id where co.enabled = 1;`
  db.query(query, (err, results) => {
    if (err) console.log(err);
    res.render('allcourse', { permission: cookie, courses: results });
  })
}

const detailsCourse = (req, res) => {
  let cookie = req.cookies.miCookie;
  if (cookie == undefined) {
    cookie = null;
  }
  const { id } = req.params;
  const query = `select co.id,co.title,co.description,co.image,co.start,ca.title as category from courses co inner join category ca on co.category_id = ca.id where co.id = ${id};`
  db.query(query, (err, results) => {
    if (err) console.log(err);
    res.render('detailscourse', { permission: cookie, course: results });
  })
}

const sendMessage = (req,res) => {
  const {username,email,message} = req.body;
  const query = `insert into comments (username,email,message) values ('${username}','${email}','${message}')`;
  db.query(query,(err,results) => {
    if(err) return res.status(404).send(err);
    res.status(200).send('Message sent');
  })
}

module.exports = {
  index,
  searchCourse,
  allCourses,
  detailsCourse,
  sendMessage
}