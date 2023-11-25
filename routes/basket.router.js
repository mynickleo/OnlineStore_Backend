const Router = require('express')
const router = new Router()
const basketController = require('../controller/basket.controller')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.get('/basket/:id', roleMiddleware(['ADMIN', 'USER']), basketController.getBasketById)
router.post('/basket', roleMiddleware(['ADMIN', 'USER']), basketController.putProductToBasket)
router.delete('/basket', roleMiddleware(['ADMIN', 'USER']), basketController.deleteProductFromBasket)

module.exports = router