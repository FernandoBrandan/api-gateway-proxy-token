import mongoose from "mongoose";
const uri = `${process.env.MONGO_URI}`;
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
       autoIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (err: any) {
    console.error("Failed to connect to MongoDB");
    console.error(err.message);
  }
}
connectToDatabase();  
export default mongoose.connection;  

// MySQL
// Firebase 