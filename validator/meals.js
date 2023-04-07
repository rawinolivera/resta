const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../validator/validateHelper')

const validateCreate = [ //TODO:name, age, email
    check('name')
        .exists()
        .not()
        .isEmpty(),

    check('description')
        .exists()
        .not()
        .isEmpty(),
        
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }