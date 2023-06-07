const db = require("../data/db");


const signupCourse = (req, res) => {
    let cookie = req.cookies.miCookie;
    if (cookie === undefined) {
      return res.status(403).json({ message: 'No tiene permiso para está acción' });
    }
    let username = req.cookies.username;
    const { id } = req.params;
    const query = `select us.id from users us inner join users_courses uc on us.id = uc.user_id where us.username = '${username}' and uc.course_id = ${id};`
    db.query(query, (err, results) => {
      if (err) return res.status(404).json({ message: 'Error en la base de datos' });
  
      if (results.length === 1) {
        return res.status(202).json({ message: `Sr/sra ${username}: Figuras como incripto a este curso.` })
      } else {
        let query = `insert into users_courses (course_id,user_id) values (${id},(select id from users where username = '${username}'));`
        db.query(query, (err, results) => {
          if (err) return res.status(404).json({ message: 'Error en la base de datos' });
  
          return res.status(201).json({ message: `Sr/sra ${username}: se inscribio correctamente al curso.` });
        })
      }
    })
  }

  const mycourses = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'client') {
        return res.redirect('/',);
    }
    let username = req.cookies.username;
    const query = `select uc.id as id,co.title,co.start from courses co inner join users_courses uc on co.id = uc.course_id inner join users u on uc.user_id = u.id where u.username = '${username}';`
    db.query(query,(err,results) => {
      if (err) return res.status(404).json(err);
      res.render('client/mycourses',{permission:cookie,courses:results});
    })
  }

  const outCourse = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'client') {
        return res.redirect('/',);
    }
    const { id } = req.params
    const query = `delete from users_courses WHERE id=${id};`
    db.query(query, (err,results) => {
      if(err) return res.status(404).send(err);
      return res.status(200).send('Deleted correctly')
    })
  }

  const getUpdateDataPersonal = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'client') {
        return res.redirect('/',);
    }
    let username = req.cookies.username;
    const query = `select * from data_personal where user_id = (select id from users where username = '${username}');`;
    db.query(query,(err,results) => {
      if(err) return res.status(404).send(err);
      return res.render('client/mydatapersonal',{permission:cookie,users:results});
    })
  }

  const putUpdateDataPersonal = (req,res) => {
    const cookie = req.cookies.miCookie;
    if (cookie !== 'client') {
        return res.redirect('/',);
    }
    let username = req.cookies.username;
    const {last_name,first_name,second_name,city,province,country,phone,email,social_network} = req.body;
    const query = `select * from data_personal where user_id = (select id from users where username = '${username}');`;
    db.query(query,(err,results) => {
      if(err) return res.status(404).send(err);
      var query = '';
      if (results.length === 1) {
        query = `update data_personal set last_name='${last_name}',first_name='${first_name}',second_name='${second_name}',city='${city}',province='${province}',country='${country}',phone='${phone}',email='${email}',social_network='${social_network}' where user_id = (select id from users where username = '${username}');`
      } else {
        query = `insert into data_personal (last_name,first_name,second_name,city,province,country,phone,email,social_network,user_id) values ('${last_name}','${first_name}','${second_name}','${city}','${province}','${country}','${phone}','${email}','${social_network}',(select id from users where username = '${username}'));`;
      }
      db.query(query,(err,results) => {
        if(err) return res.status(404).send(err)
        return res.status(201).json({message:'Datos actualizados'});
      })
    })
  }

  module.exports = {
    signupCourse,
    mycourses,
    outCourse,
    getUpdateDataPersonal,
    putUpdateDataPersonal,
    
  }