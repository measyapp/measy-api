import { genSalt, hash as _hash } from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS);
  const salt = await genSalt(saltRounds);
  const hash = await _hash(password, salt);
  return hash;
}

export default { hashPassword };