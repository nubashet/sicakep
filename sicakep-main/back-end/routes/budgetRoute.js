const router = require('express').Router()
const BudgetController = require('../controllers/BudgetController')
const Middleware = require('../middleware/Middleware')

router.get('/', (req, res) => {
  res.send('SICAKEP BUDGET SERVICE')
})
router.post('/add/:UserId', Middleware.adminAuthorization, BudgetController.addBudget)
router.get('/get-all', Middleware.supervisorAndAdminAuthorization, BudgetController.getBudgets)

module.exports = router
