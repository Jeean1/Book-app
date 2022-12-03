const express = require("express");

// Controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  getAllReserves,
  getAllBooksAvailable,
  createReserve,
  deleteReserve,
  getBookId,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get("/getAllReserveBooks", getAllReserves); // Mostrar los libros reservados.

usersRouter.get("/booksAvailable", getAllBooksAvailable); // Mostrar los libros reservados. (Mapear en react)

usersRouter.get("/bookId/:id", getBookId); //Muestra el detalle de un libro

usersRouter.post("/createReserve", createReserve); // Crea una reserva de un libro, en book detail ingresandoe el día en el botón "reserve"

usersRouter.delete("/deleteReserve", deleteReserve); //Elimina un libro reservado por el cliente, cambia status de "reserved" a "active"

module.exports = { usersRouter };
