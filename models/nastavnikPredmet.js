const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const NastavnikPredmet = sequelize.define("nastavnik_predmet",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    { timestamps: false }
    );
    return NastavnikPredmet;
};
