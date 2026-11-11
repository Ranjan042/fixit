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
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').bail(),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').bail(),
    validate
];

export const validateRegister = [
    body('name')
        .notEmpty().withMessage('Name is required')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long').bail(),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format').bail(),


    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').bail(),

    validate

]

