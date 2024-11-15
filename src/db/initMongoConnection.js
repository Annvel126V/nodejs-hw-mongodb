import mongoose from 'mongoose';

export async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;
  if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
    console.error('One or more MongoDB environment variables are missing');
    console.log(`MONGODB_USER: ${MONGODB_USER}`);
    console.log(`MONGODB_PASSWORD: ${MONGODB_PASSWORD}`);
    console.log(`MONGODB_URL: ${MONGODB_URL}`);
    console.log(`MONGODB_DB: ${MONGODB_DB}`);
    return;
  }
  const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoURI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
}
