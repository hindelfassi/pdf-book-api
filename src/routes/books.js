const express = require("express");
const {
  getAllBooks,
  createBook,
  getBookByID,
  updateBook,
  deleteBook,
  getBookByFileID,
} = require("../controllers/bookController"); // Assuming your controller is called bookController
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/verifyToken");
const router = express.Router();

// Routes for books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook); // Only admins can create books

router
  .route("/:id")
  .get(getBookByID)
  .put(verifyTokenAndAdmin, updateBook) // Only admins can update books
  .delete(verifyTokenAndAdmin, deleteBook); // Only admins can delete books

router.route("/fileid/:fileID").get(getBookByFileID);
module.exports = router;
