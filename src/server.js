import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

export function setupServer() {
  const app = express();

  //Middleware для парсингу JSON
  // app.use(express.json());

  // Middleware для CORS
  app.use(cors());

  app.use(cookieParser());
  // Логер Pino
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts/', router);

  app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Contact list',
    });
  });

  // Обробка невідомих маршрутів
  app.use(notFoundHandler);

  // Обробка помилок
  app.use(errorHandler);

  // запускаємо сервер
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  return app;
}
