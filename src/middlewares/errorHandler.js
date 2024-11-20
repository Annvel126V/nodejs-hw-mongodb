export default function errorHandler(err, req, res, next) {
  // Перевірка, чи отримали ми помилку від createHttpError

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: 'Something went wrong',
    data: err.message || 'Unexpected error',
  });
}
