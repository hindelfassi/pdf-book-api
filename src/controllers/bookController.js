const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book"); // Assuming you have a Book model

/**
 *  @desc    Get All Books
 *  @route   /api/v1/books
 *  @method  GET
 *  @access  public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    // Find all products
    const total = await Book.countDocuments();
    const books = await Book.find().skip(startIndex).limit(limit);
    // Pagination data
    const pagination = {
      current: page,
      bookInPage: limit,
      total: total,
      hasNext: endIndex < total,
      hasPrevious: startIndex > 0,
    };

    res.json({
      success: true,
      books,
      pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
});

/**
 *  @desc    Get Book BY ID
 *  @route   /api/v1/books/:id
 *  @method  GET
 *  @access  public
 */
const getBookByID = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

/**
 *  @desc    Create new Book
 *  @route   /api/v1/books
 *  @method  POST
 *  @access  private (only admin)
 */
const createBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = new Book(req.body);
  const result = await book.save();
  res.status(201).json(result);
});

/**
 *  @desc    Update Book BY ID
 *  @route   /api/v1/books/:id
 *  @method  PUT
 *  @access  private (only admin)
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body, // Update all fields
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});

/**
 *  @desc    Delete Book By ID
 *  @route   /api/v1/books/:id
 *  @method  DELETE
 *  @access  private (only admin)
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book has been deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = {
  createBook,
  getAllBooks,
  getBookByID,
  updateBook,
  deleteBook,
};
