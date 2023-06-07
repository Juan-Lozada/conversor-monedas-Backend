const request = require("supertest");
const app = require("../app");

describe("Validaciones a rutas definidas", () => {
  it("Validar Inicio Sesión ", async () => {
    const email = 'c.rivera.henriquez@gmail.com';
    const password = '123123';

    const resultado = await request(app).post("/login").send({ email, password })
    expect(resultado.statusCode).toBe(200);
  });

  it("Validar registro de usuario ", async () => {
    const usuario = {
      id: 5,
      nombre: "Usuario",
      apellido_paterno: "Prueba",
      rut: "11.111.111-1",
      email: "usuario.prueba@test.cl",
      telefono: "123456789",
      direccion: "Los Tulipanes 15",
      comuna: "Villa Alemana",
      tipo_user: 0,
      password: "123123",
    };
    const resultado = await request(app).post("/registro").send(usuario);
    expect(resultado.statusCode).toBe(201);
  });

  it("Validar GET USER", async () => {
    const usuario = {
      id: 8,
    };

    const resultado = await request(app).get(`/usuario/${usuario.id}`);
    expect(resultado.statusCode).toBe(200);
  });
});


