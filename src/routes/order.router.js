const Router = require('express')
const router = new Router()
const orderController = require('../controller/order.controller')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/orders', roleMiddleware(['ADMIN']), orderController.getOrdersAll)
router.get('/orders_details', roleMiddleware(['ADMIN']), orderController.getOrdersDetailsAll)
router.get('/orders/:id', roleMiddleware(['ADMIN', 'USER']), orderController.getOrdersById)
router.get('/orders_details/:id', roleMiddleware(['ADMIN', 'USER']), orderController.getOrdersDetailsById)
router.post('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.createOrder)
router.delete('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.deleteOrder)
router.put('/orders', roleMiddleware(['ADMIN', 'USER']), orderController.changeProductFromOrder)

module.exports = router