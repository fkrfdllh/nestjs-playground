import * as bcrypt from 'bcrypt';

export const protectString = async (value: string): Promise<string> => {
  const salt: string = await bcrypt.genSalt();
  return await bcrypt.hash(value, salt);
};

export const compareBcryptWithString = async (
  value: string,
  hashed: string,
): Promise<boolean> => {
  return await bcrypt.compare(value, hashed);
};
