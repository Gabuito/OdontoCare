import byCrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await byCrypt.genSalt(10);
  return await byCrypt.hash(password, salt);
}

export const comparePassword = async (password, hash) => {
  return await byCrypt.compare(password, hash);
}

