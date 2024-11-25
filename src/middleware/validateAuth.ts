import { body } from 'express-validator';

// Middleware validasi untuk register
export const validateRegister = [
  body('email')
    .isString().withMessage('Email must be a string')
    .isLength({ min: 5 }).withMessage('Email must be at least 5 characters long')
    .isEmail().withMessage('Email must be valid'),
  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
  body('phoneNumber')
    .optional()
    .isString().withMessage('Phone number must be a string')
    .isLength({ min: 5 }).withMessage('Phone number must be at least 5 characters long'),
];
