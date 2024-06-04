const mongoose = require("mongoose");
const Joi = require("joi");

const BookSchema = new mongoose.Schema({
  pages: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  datePublished: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  originalTitle: {
    type: String,
    required: true,
  },
  awards: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  fileID: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorDiscription: {
    type: String,
  },
});

const Book = mongoose.model("Book", BookSchema);

// Validation Schema
const createBookSchema = Joi.object({
  pages: Joi.string().required(),
  format: Joi.string().required(),
  language: Joi.string().required(),
  isbn: Joi.string(),
  datePublished: Joi.string().required(),
  publisher: Joi.string().required(),
  originalTitle: Joi.string().required(),
  awards: Joi.string(),
  title: Joi.string().required(),
  subTitle: Joi.string(),
  description: Joi.string().required(),
  imageUrl: Joi.string().required(),
  fileID: Joi.string().required(),
  authors: Joi.array().items(Joi.string()).required(),
  genres: Joi.array().items(Joi.string()).required(),
  author: Joi.string().required(),
  authorDiscription: Joi.string(),
});

const updateBookSchema = Joi.object({
  pages: Joi.string(),
  format: Joi.string(),
  language: Joi.string(),
  isbn: Joi.string(),
  datePublished: Joi.string(),
  publisher: Joi.string(),
  originalTitle: Joi.string(),
  awards: Joi.string(),
  title: Joi.string(),
  subTitle: Joi.string(),
  description: Joi.string(),
  imageUrl: Joi.string(),
  fileID: Joi.string(),
  authors: Joi.array().items(Joi.string()),
  genres: Joi.array().items(Joi.string()),
  author: Joi.string(),
  authorDiscription: Joi.string(),
});

function validateCreateBook(obj) {
  return createBookSchema.validate(obj);
}

function validateUpdateBook(obj) {
  return updateBookSchema.validate(obj);
}

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook,
};
