const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Pool } = require("pg");

const host = process.env.PGHOST || process.env.DB_HOST;
const user = process.env.PGUSER || process.env.DB_USER;
const database = process.env.PGDATABASE || process.env.DB_NAME;
const password = process.env.PGPASSWORD || process.env.DB_PASSWORD;
const name = process.env.PGDATABASE || process.env.DB_NAME;

const pool = new Pool({
  host: host,
  user: user,
  name: name,
  password: password,
  database: database,
  allowExitOnIdle: true,
});

const verificarUsuario = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const { rows, rowCount } = await pool.query(consulta, values);
  console.log(rows);

  if (rowCount === 0) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }

  const passwordEncriptada = rows[0].password;

  console.log('passwordEncriptada:', passwordEncriptada);
  console.log('password:', password);

  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" };

  const usuario = {
    nombre: rows[0].nombre,
    email: rows[0].email,
    id: rows[0].id,
    tipo_usuario: rows[0].tipo_user
  };

  return usuario;
};

const registrarUsuario = async (usuario) => {
  let {
    nombre,
    apellido_paterno,
    email,
    tipo_user,
    password,
  } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  password = passwordEncriptada;
  const values = [
    nombre,
    apellido_paterno,
    email,
    tipo_user,
    password,
  ];
  const consulta =
    "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4, $5)";
  await pool.query(consulta, values);
};

const ObtenerUsuario = async (id) => {
  try {
    console.log(id);
    const consulta = "SELECT * FROM usuarios where id = $1;";
    const values = [id];
    const { rows } = await pool.query(consulta, values);
    console.log("lectura base datos usuario");
    console.log(rows);
    return rows[0];
  } catch (err) {
    console.log("error database usuario");
    console.log(pool);
    throw err;
  }
};


module.exports = {
  verificarUsuario,
  registrarUsuario,
  ObtenerUsuario,
};
