const Sequelize = require("sequelize");
//const { student, predmet } = require("./db");
const Student = require("./student");
const Predmet = require("./predmet");

module.exports = function(sequelize,DataTypes){
    const Prisustvo = sequelize.define("prisustvo",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sedmica: Sequelize.INTEGER,
        predavanja: Sequelize.INTEGER,
        vjezbi: Sequelize.INTEGER
    },
    { timestamps: false }
    );
    return Prisustvo;
};
