import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import dotenv from 'dotenv';

dotenv.config();

async function start() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting the application:', error);
  }
}
start();
console.log('MongoDB Environment Variables:', {
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_URL: process.env.MONGODB_URL,
  MONGODB_DB: process.env.MONGODB_DB,
});
