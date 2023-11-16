module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Project_User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Project',
          },
          key: 'id'
        },
        allowNull: false
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'User',
          },
          key: 'id'
        },
        allowNull: false
      }
    },);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Project_User');
  }
}