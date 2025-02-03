import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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

//agregar legajo o algun id

export default mongoose.model("User", UserSchema);
