import mongoose from "mongoose";

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
);
export default mongoose.model("User", UserSchema);

/**
mercadoPagoId: { type: String, unique: true }, // ID opcional de MercadoPago
¿Cuándo se usa normalmente?

1 - Pagos recurrentes o suscripciones
 - Si un usuario ya tiene una cuenta vinculada en MercadoPago, 
puedes almacenar su payer.id y reutilizarlo en futuros pagos sin pedir los datos cada vez.
 - Útil para membresías, suscripciones o cobros automáticos.

2 - Historial de pagos y conciliación
 - Si quieres registrar pagos en tu base de datos y vincularlos con un usuario específico de MercadoPago.
 - Puede servir para comparar pagos en MercadoPago con los registros en tu sistema.

3 - Flujo de autenticación con MercadoPago
  - Si en el futuro integras un login con MercadoPago, 
puedes guardar su ID y recuperar información del usuario directamente desde la API de MercadoPago. 
*/