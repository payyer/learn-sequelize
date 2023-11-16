module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Group_Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Role',
          },
          key: 'id'
        },
        allowNull: false
      }
    },);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Group_Role');
  }
}