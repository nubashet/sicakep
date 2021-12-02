'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.Budget, { foreignKey: 'BudgetId' })
    }
  };
  Expense.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    initialBudget: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'Initial budget value cannot be less than 0'
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'Balance value cannot be less than 0'
        }
      }
    },
    realization: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'Expense value cannot be less than 0'
        }
      }
    },
    expenseType: DataTypes.STRING,
    editable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    month: { // 0 for January, 1 for February, and so on
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'month must be 0 - 11'
        },
        max: {
          args: 11,
          msg: 'month must be 0 - 11'
        }
      }
    },
    uniqueCode: { // created by using "BudgetId_month(in number 0-11)_expenseType" (ex: "5c57e069-06e3-45eb-87d4-cfd9c07eb821_0_belanja modal")
      type: DataTypes.STRING,
      unique: true
    },
    BudgetId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};