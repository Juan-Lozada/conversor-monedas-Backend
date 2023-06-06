const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  checkCredentialsExists,
  tokenVerification,
} = require("../middlewares/middlewares");
const indexController = require("../controllers/indexController");

router.post("/registro", indexController.registroUsuario);

router.post("/login", indexController.iniciarSesion);

router.get("/", (req, res) => {
  res.send('Welcome to my Server')
})
router.get("/usuario/:id", indexController.getUser);

module.exports = router;
