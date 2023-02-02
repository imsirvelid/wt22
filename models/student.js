const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define("student",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        index: Sequelize.INTEGER,
        ime: Sequelize.STRING,
    },
    { timestamps: false }
    );
    return Student;
};
