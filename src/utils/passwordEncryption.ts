import bcrypt from 'bcrypt';

export const passwordEncrypt = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const passwordDecrypt = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

