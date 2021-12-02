'use strict';
const csv = require('csv-parser')
const fs = require('fs')
const { checkKanwil, checkDivision, checkRole } = require('../helper/global')
const Helper = require('../helper/Helper')
const { v4: uuidv4 } = require('uuid')

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
    const results = [];
    fs.createReadStream('DATA_UPT.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const newResults = results.map((item) => {
        return(
          {
            id: uuidv4(),
            name: item.NAME,
            username: item.USERNAME,
            kanwil: checkKanwil[item.KANWIL],
            division: checkDivision[item.DIVISI.toLowerCase()],
            role: checkRole['user'],
            password: Helper.hashSync('P@55word'),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        )
      })
      return await queryInterface.bulkInsert('Users', newResults)
    });
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
