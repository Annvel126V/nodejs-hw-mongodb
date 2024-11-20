import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/contacts.js';

// import { env } from './utils/env.js';

export function setupServer() {
  const app = express();

  app.use('/api', router);

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Contact list',
    });
  });
  //404 ловимо
  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  });
  // запускаємо сервер
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  return app;
}
