'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Budgets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      year: {
        type: Sequelize.STRING
      },
      uniqueCode: { // created by using "UserId_budgetYear" (ex: "5c57e069-06e3-45eb-87d4-cfd9c07eb821_2019")
        type: Sequelize.STRING,
        unique: true
      },
      UserId: {
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
    await queryInterface.addConstraint('Budgets', {
      fields: ['UserId'],
      type: 'foreign key',
      name: `custom_fkey_User_Budget`,
      references: { table: 'Users', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Budgets');
  }
};