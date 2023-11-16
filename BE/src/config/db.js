const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Sequelize', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});

class User extends Model { }

User.init({
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});


// Đồng bộ hóa model với database
const synchronization = async () => {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
};


module.exports = sequelize;
