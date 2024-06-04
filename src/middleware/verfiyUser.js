const { verifyToken } = require("./verifyToken");

// Verify Token & Authorize setrole

function verifyTokenAndUserNoRole(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === null) {
      next();
    } else {
      return res.status(403).json({ message: "you already having a role" });
    }
  });
}

// Verify Token & Authorize the Student
function verifyTokenAndStudent(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "student") {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed" });
    }
  });
}

// Verify Token & Authorize the Supervisor
function verifyTokenAndSupervisor(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "admin" || req.user.role === "student") {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed" });
    }
  });
}

module.exports = {
  verifyTokenAndUserNoRole,
  verifyTokenAndStudent,
  verifyTokenAndSupervisor,
};
