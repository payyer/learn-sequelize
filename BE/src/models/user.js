'use strict';
const {
  Model,
} = require('sequelize');
const group = require('./group');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group, { foreignKey: 'groupId' });
      // User.hasMany(models.Project, { foreignKey: 'customerId' });
      User.belongsToMany(models.Role, { through: 'Project_User', foreignKey: 'projectId', otherKey: 'userId' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING,
    groupId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
    freezeTableName: true
  });
  return User;
};