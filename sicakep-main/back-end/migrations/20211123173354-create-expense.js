'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      initialBudget: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER
      },
      realization: {
        type: Sequelize.INTEGER
      },
      expenseType: {
        type: Sequelize.STRING
      },
      editable: {
        type: Sequelize.BOOLEAN
      },
      month: {
        type: Sequelize.INTEGER
      },
      uniqueCode: { // created by using "BudgetId_month(in number 0-11)_expenseType" (ex: "5c57e069-06e3-45eb-87d4-cfd9c07eb821_0_belanja modal")
        type: Sequelize.STRING,
        unique: true
      },
      BudgetId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Expenses', {
      fields: ['BudgetId'],
      type: 'foreign key',
      name: `custom_fkey_Budget_Expense`,
      references: { table: 'Budgets', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Expenses');
  }
};