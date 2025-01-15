import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // UUIDs se almacenan como cadenas
      default: uuidv4, // Generar un UUID por defecto
    },
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);

/**
 * JSON example register
{
  "name": "Fer",
  "surname": "Fer",
  "nick": "Fer",
  "email": "fer@fer.com",
  "password": "fer",
  "role": "user",
  "image": "https://example.com/image.jpg"
}

* JSON example login
{ 
  "email": "fer@fer.com",
  "password": "fer"
}
  Response
{
  "success": "Usuario logueado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9objEiLCJzdXJuYW1lIjoiRG9lMSIsImVtYWlsIjoiam9obi5kb2UxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzI3OTgyOTczLCJleHAiOjE3Mjc5ODY1NzN9.UHb7EtzzQJUEaFSprh_Ef3f8sFDRiUuQVPP_KEMCp7w"
}
 */
