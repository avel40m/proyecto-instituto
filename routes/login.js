const { login, loginPost, cerrarSesion, register, registerPost } = require("../controller/loginController");

const router = require("express").Router();

router.get("/login", login);

router.post("/login",loginPost);

router.get("/register", register);

router.post('/register',registerPost);

router.get("/cerrar-sesion", cerrarSesion);

module.exports = router;