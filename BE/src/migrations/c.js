'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      // customerId: {
      //   type: Sequelize.DataTypes.INTEGER,
      //   references: {
      //     model: {
      //       tableName: 'User',
      //     },
      //     key: 'id'
      //   },
      //   allowNull: false
      // },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Project');
  }
};


/*
  The next example is of a migration that has a foreign key.
  You can use references to specify a foreign key:
 */

// references: {
//   model: {
//     tableName: 'Projects',
//     schema: 'schema'
//   },
//   key: 'id'
// }