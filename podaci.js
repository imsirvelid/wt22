const db = require('./db.js')

db.sequelize.sync({force:false}).then(function(){
    console.log("Trebalo bi da je to to");
    db.student.create({ ime: "Velid Imširović", index: "18913"});
    db.student.create({ ime: "Mujo Mujić", index: "12345"});

    db.nastavnik.create({ username: "vimsirovic", password_hash: "$2b$10$7xlW3ybh8c78l5zGegpT/OC9lrwbvY/QP4bxQyHH1kP/UlVyXwbu."});
    db.nastavnik.create({ username: "mmujo", password_hash: "$2b$10$FU6PH5InaungJXgXBh2BpOIldgD3XNvcz/wcH5l9au/x84qNYFHby"});

    db.predmet.create({ naziv: "IM 1", predavanjaSedmicno: 3, vjezbiSedmicno: 2});
    db.predmet.create({ naziv: "IM 2", predavanjaSedmicno: 3, vjezbiSedmicno: 2});
    db.predmet.create({ naziv: "TP", predavanjaSedmicno: 3, vjezbiSedmicno: 2});
    db.predmet.create({ naziv: "UUP", predavanjaSedmicno: 3, vjezbiSedmicno: 2});


    db.nastavnikPredmet.create({ predmetId: 1, nastavnikId: 1 });
    db.nastavnikPredmet.create({ predmetId: 2, nastavnikId: 1 });
    db.nastavnikPredmet.create({ predmetId: 3, nastavnikId: 2 });
    db.nastavnikPredmet.create({ predmetId: 4, nastavnikId: 2 });

    db.prisustvo.create({ sedmica: 1, predavanja: 1, vjezbi: 1, studentId: 1, predmetId: 1 });
    db.prisustvo.create({ sedmica: 2, predavanja: 1, vjezbi: 1, studentId: 1, predmetId: 1 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 1 });
    db.prisustvo.create({ sedmica: 4, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 1 });
    db.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbi: 2, studentId: 2, predmetId: 1 });
    db.prisustvo.create({ sedmica: 2, predavanja: 2, vjezbi: 2, studentId: 2, predmetId: 1 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 1 });


    db.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbi: 1, studentId: 1, predmetId: 2 });
    db.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbi: 1, studentId: 1, predmetId: 2 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 2 });
    db.prisustvo.create({ sedmica: 4, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 2 });
    db.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 2 });
    db.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 2 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 2 });

    db.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbi: 2, studentId: 1, predmetId: 3 });
    db.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 3 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 3 });
    db.prisustvo.create({ sedmica: 4, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 3 });
    db.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 3 });
    db.prisustvo.create({ sedmica: 2, predavanja: 2, vjezbi: 2, studentId: 2, predmetId: 3 });
    db.prisustvo.create({ sedmica: 3, predavanja: 2, vjezbi: 2, studentId: 2, predmetId: 3 });

    db.prisustvo.create({ sedmica: 1, predavanja: 2, vjezbi: 1, studentId: 1, predmetId: 4 });
    db.prisustvo.create({ sedmica: 2, predavanja: 2, vjezbi: 1, studentId: 1, predmetId: 4 });
    db.prisustvo.create({ sedmica: 3, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 4 });
    db.prisustvo.create({ sedmica: 4, predavanja: 3, vjezbi: 2, studentId: 1, predmetId: 4 });
    db.prisustvo.create({ sedmica: 1, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 4 });
    db.prisustvo.create({ sedmica: 2, predavanja: 3, vjezbi: 2, studentId: 2, predmetId: 4 });
    db.prisustvo.create({ sedmica: 3, predavanja: 2, vjezbi: 2, studentId: 2, predmetId: 4 });


});