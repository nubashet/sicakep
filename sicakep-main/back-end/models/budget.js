'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Budget.belongsTo(models.User, { foreignKey: 'UserId' })
      Budget.hasMany(models.Expense)
    }
  };
  Budget.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    year: DataTypes.STRING,
    uniqueCode: { // created by using "UserId_budgetYear" (ex: "5c57e069-06e3-45eb-87d4-cfd9c07eb821_2019")
      type: DataTypes.STRING,
      unique: true
    },
    UserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};