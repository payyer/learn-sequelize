module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.DataTypes.STRING,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
      },
    },);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Role');
  }
}