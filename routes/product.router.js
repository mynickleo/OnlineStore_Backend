const Router = require('express')
const router = new Router()
const productController = require('../controller/product.controller')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.get('/products', roleMiddleware(['ADMIN', 'USER']), productController.getProducts)
router.get('/products/:id', roleMiddleware(['ADMIN', 'USER']), productController.getProductById)
router.post('/products', roleMiddleware(['ADMIN']), productController.createProduct)
router.put('/products', roleMiddleware(['ADMIN']), productController.changeProduct)
router.delete('/products', roleMiddleware(['ADMIN']), productController.deleteProduct)

module.exports = router