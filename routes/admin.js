const express = require('express')
const router = express.Router();

const authHandler = require('../authHandler/auth')

const adminController = require('../controllers/Admin/auth')
const movieController = require('../controllers/Admin/movie')
const userController = require('../controllers/Admin/user')
const orderController = require('../controllers/Admin/order')


//auth
router.post('/create' , adminController.create)
router.post('/login' , adminController.login)


router.use(authHandler.authAdmin);

router.post('/logout' , adminController.logout)

//Movie
router.post('/movie/create' , movieController.create)
router.get('/movie/list' , movieController.list)
router.put('/movie/edit' , movieController.edit)
router.put('/movie/delete' , movieController.delete)

//User
router.get('/user/list' , userController.list)

//Order
router.get('/order/list' , orderController.list)
router.get('/order/detail' , orderController.detail)
router.put('/order/status' , orderController.changeStatus)

















module.exports = router;
