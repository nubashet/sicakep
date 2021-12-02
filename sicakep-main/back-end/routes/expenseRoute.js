const router = require('express').Router()
const BudgetController = require('../controllers/BudgetController')
const Middleware = require('../middleware/Middleware')

router.get('/', (req, res) => {
  res.send('SICAKEP EXPENSE SERVICE')
})
router.post('/add/:BudgetId/:expenseType/:month', Middleware.adminAuthorization, BudgetController.addExpense)

module.exports = router
