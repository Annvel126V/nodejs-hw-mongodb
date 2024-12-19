import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './contacts/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

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

  app.use('/', router);

  app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Contact list',
    });
  });

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  // Обробка невідомих маршрутів
  app.use(notFoundHandler);

  // Обробка помилок
  app.use(errorHandler);

  // запускаємо сервер
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  return app;
}
