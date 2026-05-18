const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set. Add it to your Vercel project environment variables.');
    }
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((conn) => conn);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
