const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define("predmet",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        naziv: Sequelize.STRING,
        predavanjaSedmicno: Sequelize.INTEGER,
        vjezbiSedmicno: Sequelize.INTEGER
    },
    { timestamps: false }
    );
    return Predmet;
};
