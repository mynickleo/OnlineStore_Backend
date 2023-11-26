const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const {check} = require('express-validator')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post('/register', [
    check('email', "Email cannot be empty").notEmpty(),
    check('password', "Password length need to be longer than 4 symbols").isLength({min: 4, max: 25})
], userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/users', roleMiddleware(['ADMIN']), userController.getUsers)
router.get('/users/:id', roleMiddleware(['ADMIN', 'USER']), userController.getOneUser)
router.delete('/users', roleMiddleware(['ADMIN']), userController.deleteUser)

module.exports = router