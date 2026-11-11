import { body, validationResult } from 'express-validator';

function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((error) => ({
                field: error.param,
                message: error.msg,
            })),
        });
    }
    next();
}

export const validateLogin = [
    body('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters long'),
    validate
];

export const validateRegister = [
    body('name')
        .notEmpty().withMessage('Name is required').bail()
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces').bail()
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),


    body('password')
        .notEmpty().withMessage('Password is required').bail()
        .isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters long'),

    validate

]

