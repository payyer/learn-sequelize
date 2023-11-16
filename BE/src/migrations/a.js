module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Group', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      }
    },);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Group');
  }
}