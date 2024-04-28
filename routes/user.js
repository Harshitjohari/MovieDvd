const express = require('express')
const router = express.Router();

const authHandler = require('../authHandler/auth')

const userController = require('../controllers/User/auth')
const movieController = require('../controllers/User/movie')
const cartController = require('../controllers/User/cart')
const orderController = require('../controllers/User/order')



//auth
router.post('/register' , userController.register)
router.post('/login' , userController.login)

router.use(authHandler.authUser);

router.post('/logout' , userController.logout)

//Movie
router.get('/movie/list' , movieController.list)

//Cart
router.post('/cart/add' , cartController.add)
router.put('/cart/item/delete' , cartController.deleteItemFromCart)
router.put('/cart/empty' , cartController.emptyCart)
router.get('/cart/list' , cartController.list)

//Order
router.post('/order/create' , orderController.placeOrder)
router.get('/order/list' , orderController.list)
router.get('/order/detail' , orderController.detail)
router.put('/order/collect' , orderController.collectOrder)
















module.exports = router;
