'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'courseCode', {
      type: Sequelize.STRING, 
      allowNull: false, 
      defaultValue: 'CLASSCODE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Courses', 'courseCode')
  }
};
