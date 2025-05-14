import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    surname: {
      type: String,
      require: true
    },
    identification: {
      type: { type: String, enum: ["DNI", "CC", "PASSPORT"], required: false },
      number: { type: String, unique: true, required: false }
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    phone: {
      area_code: {
        type: String,
        require: true
      },
      number: {
        type: String,
        require: true
      },
    },
    address: {
      street_name: {
        type: String,
        require: true
      },
      street_number: {
        type: Number,
        require: true
      },
      zip_code: String,
      city: String
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super'],
      default: "user",
      require: true
    },
    image: {
      type: String,
      require: false
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)
export default mongoose.model("User", UserSchema)