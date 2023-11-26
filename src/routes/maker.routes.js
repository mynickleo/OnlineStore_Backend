const Router = require('express')
const router = new Router()
const makerController = require('../controller/maker.controller')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.get('/makers', roleMiddleware(['ADMIN', 'USER']), makerController.getMakers)
router.post('/makers', roleMiddleware(['ADMIN']), makerController.createMaker)
router.put('/makers', roleMiddleware(['ADMIN']), makerController.changeMaker)
router.delete('/makers', roleMiddleware(['ADMIN']), makerController.deleteMaker)

module.exports = router