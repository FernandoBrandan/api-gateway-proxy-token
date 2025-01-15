import joi from "joi";

export const registerValidateHandler = (data: Body) => {
  if (!data) return { error: "No data provided" };
  
  const schema = joi.object({
    name: joi.string().required(),
    surname: joi.string().required(),
    nick: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
    role: joi.string().required(),
    image: joi.string().required(),
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
