import * as argon from 'argon2';

exports.hashPassword = (passwprd: string) => {
  return argon.hash(passwprd);
};

exports.verifyPassword = (hashedPassword: string, password: string) => {
  return argon.verify(hashedPassword, password);
};
