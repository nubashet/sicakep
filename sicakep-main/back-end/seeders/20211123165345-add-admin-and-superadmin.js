'use strict';
const Helper = require('../helper/Helper')
const { v4: uuidv4 } = require('uuid')
const { checkKanwil, checkRole, checkDivision } = require('../helper/global')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
     {
      id: uuidv4(),
      name: 'nurfuad muhammad',
      username: 'nurfuad',
      password: Helper.hashSync('N@51g0R#ng'),
      role: checkRole['superadmin'],
      division: checkDivision['nonuser'],
      kanwil: checkKanwil['no'],
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      id: uuidv4(),
      name: 'ismatullah baehaki',
      username: 'ismat',
      password: Helper.hashSync('N@51g0R#ng'),
      role: checkRole['admin'],
      division: checkDivision['nonuser'],
      kanwil: checkKanwil['no'],
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
