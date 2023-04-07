const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../validator/validateHelper')

const validateCreate = [ //TODO:name, age, email
    check('firstName')
        .exists()
        .not()
        .isEmpty(),

    check('lastName')
        .exists()
        .not()
        .isEmpty(),

    check('email')
        .exists()
        .isEmail(),

    check('phoneNumber')
        .exists()
        .isNumeric(),
    check('birthday')
        .exists()
        .isDate(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }