//
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import {
  getAllContacts,
  getContactById,
} from './controllers/contactsController';

export function setupServer() {
  const app = express();
  const logger = pino();

  app.use(cors());
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });

  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  //404 ловимо
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  // запускаємо сервер
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  return app;
}
