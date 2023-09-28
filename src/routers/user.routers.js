const {Router} = require('express');
const router = Router();
const userCtrl = require("../controller/user.controller");

router.get("/", userCtrl.getStart);
router.get("/locations", userCtrl.getLocations);

router.post("/login", userCtrl.login);

router.post("/registro", userCtrl.register);
router.put("/editar-perfil", userCtrl.editarPerfil)

module.exports = router;