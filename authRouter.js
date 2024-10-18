const Router = require('express')
const router = new Router() 
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('username', 'This field cannot be empty').notEmpty(),
    check('password', 'the password must contain at least 4 characters')
    .isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)



module.exports = router