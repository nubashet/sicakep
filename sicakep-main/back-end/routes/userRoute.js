const router = require('express').Router()
const UserController = require('../controllers/UserController')
const Middleware = require('../middleware/Middleware')

router.get('/', (req, res) => {
  res.send('SICAKEP USER SERVICE')
})
router.post('/login', UserController.login)

router.use(Middleware.authentication)
router.post('/add', Middleware.superAdminAuthorization, UserController.addUser)
router.get('/get-all', Middleware.adminAuthorization, UserController.getUsers)

module.exports = router
