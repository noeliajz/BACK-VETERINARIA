const { Router } = require('express')
const Server = require('../server/server')
const router = Router()
const { check } = require('express-validator')


const { getAllUser, getOneUser ,createUser, 
    updateUser, deleteUser, loginUser, logoutUser} = require('../controllers/user')
const auth = require('../middleware/auth')

/* ENDPOINT */
router.get('/logout', auth('user'), logoutUser)
router.get('/:id', getOneUser)
router.get('/',   getAllUser)/*  auth lo saque porque daba error luego volver a poner y preguntar */
router.post('/', [
    check('nombre', 'El campo NOMBRE esta vacío').notEmpty(),
    check('nombre', 'El mínimo es de 3 caracteres').isLength({ min:3 }),
    check('apellido', 'El campo APELLIDO esta vacío').notEmpty(),
    check('apellido', 'El mínimo es de 3 caracteres').isLength({ min:3 }),
    check('direccion', 'El campo DIRECCIÓN esta vacío').notEmpty(),
    check('direccion', 'El mínimo es de 3 caracteres').isLength({ min:3 }),
    check('usuario', 'El campo USUARIO nombre esta vacío').notEmpty(),
    check('usuario', 'El mínimo es de 3 caracteres').isLength({ min:3 }),
    check('usuario', 'El campo USUARIO debe ser del tipo MAIL').isEmail(),
     check('contrasenia', 'El campo CONTRASEÑA esta vacío').notEmpty(),
    check('contrasenia', 'El mínimo es de 8 caracteres').isLength({ min:8 })

], createUser)
router.post('/login', [
    check('usuario', 'El campo USUARIO esta vacío').notEmpty(),
    check('usuario', 'El mínimo es de 3 caracteres').isLength({ min:3 }),
    check('usuario', 'El campo USUARIO debe ser del tipo MAIL').isEmail(),
    check('contrasenia', 'El campo CONTRASEÑA esta vacío').notEmpty(),
    check('contrasenia', 'El mínimo es de 8 caracteres').isLength({ min:8 })
], loginUser)
router.put('/:id', [
    check('id', 'El ID no corresponde a un ID de Mongo').isMongoId()
], updateUser)
router.delete('/:id', deleteUser)


module.exports = router