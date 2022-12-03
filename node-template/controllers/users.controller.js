const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Reserve } = require("../models/reserve.model");
const { Book } = require("../models/book.model");

dotenv.config({ path: "./config.env" });

const getAllReserves = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const reserves = await Reserve.findAll({
    include: Book,
    where: { userId: sessionUser.id },
  });

  if (!reserves) {
    return next(new AppError("You don't have reserves", 404));
  }

  res.status(200).json({
    status: "success",
    data: { reserves },
  });
});

const getAllBooksAvailable = catchAsync(async (req, res, next) => {
  const books = await Book.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "success",
    data: { books },
  });
});

const getBookId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findOne({ where: { status: "active", id } });

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { book },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const createReserve = catchAsync(async (req, res, next) => {
  const { bookId, dayReserved } = req.body;
  const { sessionUser } = req;

  const reserved = await Reserve.create({
    bookId,
    userId: sessionUser.id,
    dayReserved,
  });

  const book = await Book.findOne({ where: { id: bookId } });

  await book.update({ status: "reserved" });

  res.status(201).json({
    status: "success",
    data: { reserved },
  });
});

const login = catchAsync(async (req, res, next) => {
  // Get email and password from req.body
  const { email, password } = req.body;

  // Validate if the user exist with given email
  const user = await User.findOne({
    where: { email, status: "active" },
  });

  // Compare passwords (entered password vs db password)
  // If user doesn't exists or passwords doesn't match, send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  // Remove password from response
  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const deleteReserve = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  const reserve = await Reserve.findOne({ where: id });

  const book = await Book.findOne({ where: { id: reserve.bookId } });

  await reserve.update({ status: "completed" });

  await book.update({ status: "active" });

  res.status(200).json({
    status: "success",
    data: { reserve },
  });
});

module.exports = {
  createUser,
  login,
  getAllReserves,
  getAllBooksAvailable,
  getBookId,
  createReserve,
  deleteReserve,
};
