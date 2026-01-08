// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("Error:", err.message); // log for dev
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

export default errorHandler;    