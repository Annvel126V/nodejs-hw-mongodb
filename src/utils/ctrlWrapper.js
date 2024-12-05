export default function ctrlWrapper(ctrl) {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next); // Виклик основного контролера
    } catch (err) {
      if (err.isJoi) {
        next(err); // Передаємо Joi помилку далі
        return; // Завершуємо після next()
      }
      next(err); // Прокидаємо інші помилки далі
    }
  };
}
