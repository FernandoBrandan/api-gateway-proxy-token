import mongoose from "mongoose";  // Usar import si estás usando TypeScript o ES6

const uri = "mongodb://127.0.0.1:27017/apiGateway";

// Función para conectarse a MongoDB usando async/await
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

connectToDatabase();  // Llamada a la función de conexión

export default mongoose.connection;  // Exporta la conexión de Mongoose

// MySQL
// Firebase 