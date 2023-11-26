const Router = require('express')
const router = new Router()
const productTypesController = require('../controller/productTypes.controller')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/typesprod', roleMiddleware(['ADMIN', 'USER']), productTypesController.getTypes)
router.post('/typesprod', roleMiddleware(['ADMIN']), productTypesController.createType)
router.put('/typesprod', roleMiddleware(['ADMIN']), productTypesController.changeType)
router.delete('/typesprod', roleMiddleware(['ADMIN']), productTypesController.deleteType)

module.exports = router