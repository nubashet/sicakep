const { Budget, Expense } = require('../models')
const { checkExpenseType } = require('../helper/global')

class BudgetController {
  // budgets
  static async addBudget(req, res, next) {
    try {
      const { year } = req.body
      const { UserId } = req.params
      const budget = await Budget.create({ year, UserId, uniqueCode: `${UserId}_${year}` })
  
      res.status(201).json(budget)
    } catch(err) {
      next(err)
    }
  }

  static async getBudgets(req, res, next) {
    try {
      const budgets = await Budget.findAll({
        include: Expense,
        order: [['year', 'ASC']]
      })

      res.status(200).json(budgets)
    } catch(err) {
      next(err)
    }
  }

  // expenses
  static async addExpense(req, res, next) {
    try {
      const { BudgetId, expenseType, month } = req.params
      const { initialBudget } = req.body

      const expense = await Expense.create({
        initialBudget: initialBudget,
        balance: initialBudget,
        realization: 0,
        expenseType: checkExpenseType[expenseType],
        month: month,
        uniqueCode: `${BudgetId}_${month}_${checkExpenseType[expenseType]}`,
        BudgetId: BudgetId
      })

      res.status(201).json(expense)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = BudgetController
