const jwt = require("jsonwebtoken");

const {
  verificarUsuario,
  registrarUsuario,
  ObtenerUsuario,
} = require("../function/functions");

const indexController = {
  iniciarSesion: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('email:', email);
      console.log('password:', password);
      const token = jwt.sign({ email }, "az_AZ", { expiresIn: "300" });
      console.log('token:', token);
      const usuario = await verificarUsuario(email, password);
      console.log('usuario:', usuario);
      res.header('Authorization', `Bearer ${token}`).status(200).send({ usuario, token });
    } catch (e) {
      res.status(404).send(e.message);
    }
  },

  registroUsuario: async (req, res) => {
    try {
      const usuario = req.body;
      await registrarUsuario(usuario);
      res.status(201).send("Usuario creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await ObtenerUsuario(id);
      console.log(usuario)
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

};

module.exports = indexController;
