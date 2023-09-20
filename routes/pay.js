const { Router } = require('express')
const { createPay, responseSuccess, responsePending, responseFailure } = require('../controllers/pay')
const router = Router()

router.post('/', createPay)
router.get('/success', responseSuccess)
router.get('/pending', responsePending)
router.get('/failure', responseFailure)



module.exports = router 