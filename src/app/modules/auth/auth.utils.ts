import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn });
  return token;
};
