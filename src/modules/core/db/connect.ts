import mongoose from 'mongoose';

async function connectDB() {
  try {
    const { MONGODB_USER } = process.env

    const MONGODB_PASSWORD =
    encodeURIComponent(process.env.MONGODB_PASSWORD ? process.env.MONGODB_PASSWORD : '')
    || process.env.MONGODB_PASSWORD

    await mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.a5trgdx.mongodb.net/`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
//const connection = {connectDB,clientPromise}
export default connectDB ;