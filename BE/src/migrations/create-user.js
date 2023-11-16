'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Group',
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};


/*
  The next example is of a migration that has a foreign key.
  You can use references to specify a foreign key:
 */

// references: {
//   model: {
//     tableName: 'users',
//     schema: 'schema'
//   },
//   key: 'id'
// }