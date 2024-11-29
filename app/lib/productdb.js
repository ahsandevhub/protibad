import mongoose from "mongoose";

const DATABASE_URL = process.env.PRODUCTDB_URI;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local",
  );
}

let cachedProduct = global.mongooseProduct;

if (!cachedProduct) {
  cachedProduct = global.mongooseProduct = { conn: null, promise: null };
}

async function connectProductDB() {
  if (cachedProduct.conn) {
    return cachedProduct.conn;
  }

  if (!cachedProduct.promise) {
    const opts = {
      bufferCommands: false,
    };

    const mongooseInstance = new mongoose.Mongoose(); // Create a new Mongoose instance

    cachedProduct.promise = mongooseInstance
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cachedProduct.conn = await cachedProduct.promise;
  return cachedProduct.conn;
}

export default connectProductDB;
