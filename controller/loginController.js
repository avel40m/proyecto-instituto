const db = require("../data/db");

const login = (req,res) => res.render("login",{permission:null});

const loginPost = (req,res) => {
    const {username,password} = req.body;

    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}';`;

    db.query(query, (err,results) => {
        if(err) return res.status(404).json({message:err});
        
        if(results.length === 0) return res.status(404).json({message: 'No se puede ingresar, chequee los datos nuevamente.'});

        res.cookie('miCookie', results[0].permission, { maxAge: 900000, httpOnly: true });
        res.cookie('username', results[0].username, { maxAge: 900000, httpOnly: true });
        res.status(200).json({message: 'Usuario logueado correctamente'})
    })

}

const register = (req,res) => res.render("register",{permission:null});

const registerPost = (req,res) => {
    const { username, password } = req.body;
    const query = `INSERT INTO users (username,password) VALUES ('${username}','${password}');`;
    db.query(query, (err,results) => {
        if(err) return res.status(404).json({message:`El nombre ${username} existe en nuestra base de datos`});
        
        res.status(201).json({message:`Sr/a ${username}: se registro correctamente a la pagina`});
    })
}

const cerrarSesion = (req,res) => {
    res.clearCookie('miCookie', { httpOnly: true });
    res.clearCookie('username', { httpOnly: true });
      res.redirect('/');
}

module.exports = {
    login,
    loginPost,
    register,
    registerPost,
    cerrarSesion
}