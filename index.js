const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const session = require('express-session');
const app = express();
const { Op } = require("sequelize");

const db = require('./sqlite3.js')

/*db.sequelize.sync({force:false}).then(function(){
    console.log("Trebalo bi da je to to");
});*/


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/html"));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: 'ec6b29cdc0a27dbc1ee8683b14795a63',
    resave: true,
    saveUninitialized: true
 }));
 

app.post('/login', async function(req, res){
    var validLogin = false;
    var nastavnik = await db.nastavnik.findOne({ where: {username: req.body.username}});
    if (nastavnik){
        if (bcrypt.compareSync(req.body.password, nastavnik.password_hash)){
            validLogin = true;
            req.session.username = nastavnik.username;
            db.nastavnik.findOne({ where: {username: req.session.username}}).then(function(user){
                db.nastavnikPredmet.findAll({ attributes: ['predmetId'], where: {nastavnikId : user.id }}).then(function(predmeti) {
                    var idPredmeta = Array.from(predmeti, predmet => predmet.predmetId);
                    db.predmet.findAll({ where: { id: { [Op.in] : idPredmeta }}}).then(function(predmeti){
                        req.session.predmeti = Array.from(predmeti, predmet => predmet.naziv);
                        res.status(200).json({poruka: "Uspješna prijava"});
                        return;
                    })
                });
            });
        }
    } 
    if (!validLogin) res.status(401).send({poruka: "Prijava nije uspješna"});  
});

app.post('/logout', function(req, res) {
    req.session.username = null;
    req.session.predmeti = null;
    res.status(200).end();
});

app.post('/prisustvo/predmet/:NAZIV/student/:index', function(req, res) {
    if (req.session.username == null)
        res.status(403).send({ poruka: "Morate biti prijavljeni kao nastavnik" });
    db.predmet.findOne({ where: { naziv: req.params.NAZIV }}).then(async function(predmet){
        await db.student.findOne({ where: { index: req.params.index }}).then(async function(student){
            var prisustvo = await db.prisustvo.findOne({ where: { sedmica: req.body.sedmica, predmetId: predmet.id, studentId: student.id }});
            if (prisustvo == null){
                prisustvo = await db.prisustvo.create({ sedmica: req.body.sedmica, predmetId: predmet.id, studentId: student.id });
            }
            prisustvo.predavanja = req.body.predavanja;
            prisustvo.vjezbi = req.body.vjezbe;
            await prisustvo.save();
            db.prisustvo.findAll({ include: [{model: db.student, attributes: ['index']}],where: { predmetId: predmet.id }}).then(async function(prisustva){
                var studentiId = Array.from(prisustva, prisustvo => prisustvo.studentId);
                var studenti = await db.student.findAll({ where: { id: { [Op.in] : studentiId }}});
                var studentiJson = []
                Array.from(studenti, student => studentiJson.push({ime: student.ime, index: student.index}));
                var prisustvaJson = []
                Array.from(prisustva, p => prisustvaJson.push({ sedmica: p.sedmica, predavanja: p.predavanja, vjezbe: p.vjezbi, index: p.student.index }));
                var novoPrisustvo = {
                    studenti: studentiJson,
                    prisustva: prisustvaJson,
                    predmet: req.params.NAZIV,
                    brojPredavanjaSedmicno: predmet.predavanjaSedmicno,
                    brojVjezbiSedmicno: predmet.vjezbiSedmicno,
                }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(novoPrisustvo);
            });
        })
    })
    //res.status(200).send(prisustvo);
});

app.get('/predmeti', function(req, res){
    if (req.session.username == null){
        res.status(401).send({greska: "Nastavnik nije loginovan"});
    } else {
        res.status(200).send({ predmeti: req.session.predmeti });
    }
});

app.get('/predmet/:NAZIV', function(req, res) {
    db.predmet.findOne({ where: { naziv: req.params.NAZIV }}).then(function(predmet){
        db.prisustvo.findAll({ include: [{model: db.student, attributes: ['index']}],where: { predmetId: predmet.id }}).then(async function(prisustva){
            var studentiId = Array.from(prisustva, prisustvo => prisustvo.studentId);
            var studenti = await db.student.findAll({ where: { id: { [Op.in] : studentiId }}});
            var studentiJson = []
            Array.from(studenti, student => studentiJson.push({ime: student.ime, index: student.index}));
            var prisustvaJson = []
            Array.from(prisustva, p => prisustvaJson.push({ sedmica: p.sedmica, predavanja: p.predavanja, vjezbe: p.vjezbi, index: p.student.index }));
            var novoPrisustvo = {
                studenti: studentiJson,
                prisustva: prisustvaJson,
                predmet: req.params.NAZIV,
                brojPredavanjaSedmicno: predmet.predavanjaSedmicno,
                brojVjezbiSedmicno: predmet.vjezbiSedmicno,
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(novoPrisustvo);
        });
    });
});

app.listen(3000);