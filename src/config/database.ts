import mongoose from "mongoose";
const uri = "mongodb://127.0.0.1:27017/apiGateway";
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