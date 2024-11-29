import mongoose from "mongoose";

const DATABASE_URL = process.env.USERDB_URI;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cachedUser = global.mongooseUser;

if (!cachedUser) {
  cachedUser = global.mongooseUser = { conn: null, promise: null };
}

async function connectUserDB() {
  if (cachedUser.conn) {
    return cachedUser.conn;
  }

  if (!cachedUser.promise) {
    const opts = {
      bufferCommands: false,
    };

    const mongooseInstance = new mongoose.Mongoose(); // Create a new Mongoose instance

    cachedUser.promise = mongooseInstance
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cachedUser.conn = await cachedUser.promise;
  return cachedUser.conn;
}

export default connectUserDB;
