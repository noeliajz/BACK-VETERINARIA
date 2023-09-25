const { Router } = require('express')
const { getOneCartAllProduct, addProductCart, createCart} = require('../controllers/carts')
const router = Router()
const auth = require('../middleware/auth')

router.get('/:id',  getOneCartAllProduct)
router.post('/:idCart/:idProd', addProductCart)
router.post('/', createCart)

module.exports = router