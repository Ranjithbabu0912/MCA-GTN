const mongoose = require('mongoose');

const DEFAULT_ATLAS_URI = 'mongodb+srv://rb7952158_db_user:p8SWmWLw2ve0Lx3X@cluster0.ijlmu5s.mongodb.net/mca_gtn?retryWrites=true&w=majority';

let isConnectedToMongo = false;

async function connectDB() {
  // Reuse existing connection if already open or connecting in serverless environment
  if (mongoose.connection.readyState === 1) {
    isConnectedToMongo = true;
    return;
  }

  const uri = process.env.MONGODB_URI || DEFAULT_ATLAS_URI;

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
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
  isMongo: () => isConnectedToMongo || mongoose.connection.readyState === 1
};
