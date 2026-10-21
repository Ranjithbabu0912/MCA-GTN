const mongoose = require('mongoose');

let isConnectedToMongo = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnectedToMongo = true;
    console.log(`[MongoDB] Connected successfully to MongoDB Atlas.`);
  } catch (err) {
    isConnectedToMongo = false;
    console.error(`[MongoDB] Connection error: ${err.message}`);
  }
}

module.exports = {
  connectDB,
  isMongo: () => isConnectedToMongo
};
