const { Router } = require('express')
const { getOneCartAllProduct, addProductCart, createCart} = require('../controllers/carts')
const router = Router()
const auth = require('../middleware/auth')/* agregue hoy */

router.get('/:id', getOneCartAllProduct) /* lo SAQUE HOY LUNES */
router.post('/:idCart/:idProd', addProductCart)
router.post('/', createCart)

module.exports = router