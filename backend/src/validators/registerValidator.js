import { header } from 'express-validator';

export const registerValidator = [
  header("email").isEmail().withMessage("no-valid-email"),
  // header("hash").isStrongPassword().withMessage("hash-too-weak"),
];

