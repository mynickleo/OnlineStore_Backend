const Router = require('express')
const router = new Router()
const rolesController = require('../controller/roles.contoller')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post('/roles', roleMiddleware(['ADMIN']), rolesController.setRole)
router.get('/roles', roleMiddleware(['USER', 'ADMIN']), rolesController.getRoles)
router.get('/roles/:id', roleMiddleware(['USER', 'ADMIN']), rolesController.getOneRole)
router.delete('/roles/:id', roleMiddleware(['ADMIN']),rolesController.deleteUserRole)

module.exports = router