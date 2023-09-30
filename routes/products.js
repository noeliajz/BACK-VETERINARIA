const express = require('express')
const { check } = require('express-validator')

const router = express.Router()
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/products')
const multer = require('../helpers/multer')
const auth = require('../middleware/auth')

/* CRUD PRODUCT */
router.get('/', getAllProducts)
router.get('/:id',getOneProduct)
router.post('/', multer.single('image') ,
[
    check('nombre', 'campo NOMBRE vacío').notEmpty(),
    check('precio', 'campo PRECIO vacío').notEmpty(),
    check('descripcion', 'campo DESCRIPCIÓN vacío').notEmpty(),
    check('cantidad', 'campo CANTIDAD vacío').notEmpty()

], auth('admin'),createProduct)
router.put('/:id',
[
    check('nombre', 'campo NOMBRE vacío').notEmpty(),
    check('precio', 'campo PRECIO vacío').notEmpty(),
], auth('admin'), updateProduct)
router.delete('/:id', auth('admin'), deleteProduct)


module.exports = router