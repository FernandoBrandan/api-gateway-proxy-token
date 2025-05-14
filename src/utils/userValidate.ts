import joi from "joi";

export const registerValidateHandler = (data: Body) => {
  if (!data) return { error: "No data provided" };

  const schema = joi.object({
    // Nombre y Apellido
    name: joi.string().required(),
    surname: joi.string().required(),
    
    // Identificación
    identification: joi.object({
      type: joi.string().valid("DNI", "CC", "PASSPORT").optional(),
      number: joi.string().optional(),
    }).optional(),

    // Correo Electrónico y Contraseña
    email: joi.string().required().email(),
    password: joi.string().required(),
    
    // Teléfono
    phone: joi.object({
      area_code: joi.string().required(),
      number: joi.string().required(),
    }).required(),

    // Dirección
    address: joi.object({
      street_name: joi.string().required(),
      street_number: joi.number().required(),
      zip_code: joi.string().optional(),
      city: joi.string().optional(),
    }).optional(),

    // Rol (user, admin, super)
    role: joi.string().valid("user", "admin", "super").required(),
    
    // Imagen
    image: joi.string().optional(),
  });

  return schema.validate(data);
};


export const loginValidateHandler = (data: Body) => {
  if (!data) return { error: "No data provided" };
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  });
  return schema.validate(data);
};
