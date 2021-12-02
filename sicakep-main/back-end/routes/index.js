const router = require('express').Router()
const userRouter = require('./userRoute')
const budgetRouter = require('./budgetRoute')
const expenseRouter = require('./expenseRoute')
const Middleware = require('../middleware/Middleware')

router.get('/', (req, res) => {
  res.send('KEMENKUMHAM SICAKEP API 1.0')
})
router.use('/user', userRouter)

router.use(Middleware.authentication)
router.use('/budget', budgetRouter)
router.use('/expense', expenseRouter)

module.exports = router
