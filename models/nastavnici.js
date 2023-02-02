const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Nastavnik = sequelize.define("nastavnik",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: Sequelize.STRING,
        password_hash: Sequelize.STRING
    },
    { timestamps: false }
    );
    return Nastavnik;
};
