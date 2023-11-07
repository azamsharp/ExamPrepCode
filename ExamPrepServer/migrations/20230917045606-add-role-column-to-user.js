'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'roleId', {
      type: Sequelize.INTEGER, 
      references: {
        model: 'Roles',
        key: 'id'  
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'roleId')
  }
};
