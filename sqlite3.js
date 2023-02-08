const Sequelize = require("sequelize");
const path = require('path');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


db.nastavnik = require(path.join(__dirname, 'models/nastavnici.js'))(sequelize, Sequelize.DataTypes)
db.predmet = require(path.join(__dirname, 'models/predmet.js'))(sequelize, Sequelize.DataTypes)
db.student = require(path.join(__dirname, 'models/student.js'))(sequelize, Sequelize.DataTypes)
db.nastavnikPredmet = require(path.join(__dirname, "models/nastavnikPredmet.js"))(sequelize, Sequelize.DataTypes);
db.prisustvo = require(path.join(__dirname, 'models/prisustvo.js'))(sequelize, Sequelize.DataTypes)

db.predmet.belongsToMany(db.nastavnik, { through: db.nastavnikPredmet, unique: false });
db.nastavnik.belongsToMany(db.predmet, { through: db.nastavnikPredmet, unique: false });

db.predmet.hasMany(db.prisustvo);
db.prisustvo.belongsTo(db.predmet);
db.student.hasMany(db.prisustvo);
db.prisustvo.belongsTo(db.student);



module.exports=db;