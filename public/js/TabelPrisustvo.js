let TabelaPrisustvo = function(divRef, podaci){
    let pozivi = PoziviAjax;
    let divTabela = document.createElement("div");
    divRef.appendChild(divTabela);
    var brojSedmica = zadnjaSedmica(podaci.prisustva);
    trenutnaSedmica = brojSedmica;

    function generisiTabelu(trenutnaSedmica) {
        var tabela = "<table><tr><th>Ime i prezime</th><th>Index</th>";
        var ukupno = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
        if (!validacija(podaci)){
            return "<h1>Podaci o prisustvu nisu validni</h1>";
        }
        for (var i = 1; i <= brojSedmica; i++){
            if (i === trenutnaSedmica)
                tabela += "<th colspan='" + ukupno + "'>" + romanize(i) + "</th>";
            else 
                tabela += "<th> " + romanize(i) + " </th>";
        }
        tabela += "<th colspan='" + (15 - brojSedmica) + "'> " + romanize(brojSedmica + 1) + " - " + romanize(15) + "</th>";
        for (var i = 0; i < podaci.studenti.length; i++){
            prisustvoZaStudenta = vratiSortiranoPrisustvo(podaci.studenti[i].index);
            tabela += "<tr class='popunjen'><td rowspan='2'>" + podaci.studenti[i].ime + "</td><td rowspan='2'>" + podaci.studenti[i].index + "</td>";
            var postotak;
            for (var j = 0; j < trenutnaSedmica - 1; j++){
                if (prisustvoZaStudenta[j].predavanja === -1 || prisustvoZaStudenta[j].vjezbe === -1)
                    postotak = 0;
                else 
                    postotak = (prisustvoZaStudenta[j].predavanja + prisustvoZaStudenta[j].vjezbe) / (ukupno) * 100
                tabela += "<td rowspan='2'>" + postotak + "%</td>";
            }
            for (var j = 1; j <= podaci.brojPredavanjaSedmicno; j++)
                tabela += "<td>P<br>" + j + "</td>";
            for (var j = 1; j <= podaci.brojVjezbiSedmicno; j++)
                tabela += "<td>V<br>" + j + "</td>";
            for (var j = trenutnaSedmica; j < brojSedmica; j++){
                if (prisustvoZaStudenta[j].predavanja === -1 || prisustvoZaStudenta[j].vjezbe === -1)
                    postotak = 0;
                else 
                    postotak = (prisustvoZaStudenta[j].predavanja + prisustvoZaStudenta[j].vjezbe) / (ukupno) * 100
                tabela += "<td rowspan='2'>" + postotak + "%</td>";
            }
            for (var j = brojSedmica + 1; j <= 15; j++)
                tabela += "<td rowspan='2' class='prljavo'></td>";
            tabela += "</tr>";
            tabela += "<tr class='prazan'>";
            for (var j = 0; j < podaci.brojPredavanjaSedmicno; j++) {
                if (j < prisustvoZaStudenta[trenutnaSedmica - 1].predavanja){
                    tabela += "<td class='zeleno predavanja'></td>";
                }else if (prisustvoZaStudenta[trenutnaSedmica - 1].predavanja === -1){
                    tabela += "<td class='bijelo predavanja'></td>";
                } else {
                    tabela += "<td class='crveno predavanja'></td>";
                }
            }
            for (var j = 0; j < podaci.brojVjezbiSedmicno; j++) {
                if (j < prisustvoZaStudenta[trenutnaSedmica - 1].vjezbe){
                    tabela += '<td class="zeleno vjezbe"></td>';
                }else if (prisustvoZaStudenta[trenutnaSedmica - 1].vjezbe === -1) {
                    tabela += "<td class='bijelo vjezbe'></td>";
                } else {
                    tabela += "<td class='crveno vjezbe'></td>";
                }
            }
        }
        tabela += "</tr></table>"
        return tabela;
    }

    let sljedecaSedmica = function() {
        if (trenutnaSedmica < brojSedmica)
            trenutnaSedmica += 1;
        divTabela.innerHTML = "<h1>[Predmet]: " + podaci.predmet + "</h1>" + generisiTabelu(trenutnaSedmica);
        dodajEvente();
    }

    let prethodnaSedmica = function(){
        if (trenutnaSedmica > 1)
            trenutnaSedmica -= 1;
        divTabela.innerHTML = "<h1>[Predmet]: " + podaci.predmet + "</h1>" + generisiTabelu(trenutnaSedmica);
        dodajEvente();
    }

    divTabela.innerHTML = "<h1>[Predmet]: " + podaci.predmet + "</h1>" + generisiTabelu(trenutnaSedmica);
    dodajEvente();
    
    function dodajEvente(){
        const vjezbeZelene = document.getElementsByClassName("zeleno vjezbe");
        for (let i = 0; i < vjezbeZelene.length; i++){
            vjezbeZelene[i].onclick = umanjiVjezbe;
        }
        const vjezbeCrvene = document.getElementsByClassName("crveno vjezbe");
        for (let i = 0; i < vjezbeCrvene.length; i++){
            vjezbeCrvene[i].onclick = uvecajVjezbe;
        }
        const predavanjaZelena = document.getElementsByClassName("zeleno predavanja");
        for (let i = 0; i < predavanjaZelena.length; i++){
            predavanjaZelena[i].onclick = umanjiPredavanja;
        }
        const predavanjaCrvena = document.getElementsByClassName("crveno predavanja");
        for (let i = 0; i < predavanjaCrvena.length; i++){
            predavanjaCrvena[i].onclick = uvecajPredavanja;
        }
        const vjezbeBijelo = document.getElementsByClassName("bijelo vjezbe");
        for (let i = 0; i < vjezbeBijelo.length; i++){
            vjezbeBijelo[i].onclick = bijeloPoljeVjezbe;
        }
        const predavanjaBijelo = document.getElementsByClassName("bijelo predavanja");
        for (let i = 0; i < predavanjaBijelo.length; i++){
            predavanjaBijelo[i].onclick = bijeloPoljePredavanja;
        }
    }
    function promijeniPrisustvo(e, promjena, piv){
        var rowWithInfo = e.srcElement.parentNode.previousElementSibling;
        var index = rowWithInfo.cells[1].innerHTML;
        var novoPrisustvo = vratiSortiranoPrisustvo(parseInt(index));
        novoPrisustvo = novoPrisustvo[trenutnaSedmica - 1];
        if (piv == 1){
            novoPrisustvo.vjezbe += promjena;
        }else if (piv == 0){
            novoPrisustvo.predavanja += promjena;
        }else if (piv == 3){
            novoPrisustvo.vjezbe = 1;
            novoPrisustvo.predavanja = 0;
        }else {
            novoPrisustvo.vjezbe = 0;
            novoPrisustvo.predavanja = 1;
        }
        var slanje = {
            sedmica: trenutnaSedmica,
            predavanja: novoPrisustvo.predavanja,
            vjezbe: novoPrisustvo.vjezbe
        };
        pozivi.postPrisustvo(podaci.predmet, parseInt(index), slanje, iscrtajSVana);
    }

    function umanjiVjezbe(e){
        promijeniPrisustvo(e, -1, 1);

    }
    function uvecajVjezbe(e){
        promijeniPrisustvo(e, 1, 1);
    }

    function umanjiPredavanja(e){
        promijeniPrisustvo(e, -1, 0);
    }
    function uvecajPredavanja(e){
        promijeniPrisustvo(e, 1, 0);
    }

    function bijeloPoljeVjezbe(e){
        promijeniPrisustvo(e, 1, 3);
    }

    function bijeloPoljePredavanja(e){
        promijeniPrisustvo(e, 1, 4);
    }

    let lijevo = document.createElement("button");
    lijevo.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    lijevo.onclick = prethodnaSedmica;
    divRef.appendChild(lijevo);
    let desno = document.createElement("button");
    desno.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    desno.onclick = sljedecaSedmica;
    divRef.appendChild(desno);

    function iscrtajSVana(data, err){
        podaci = JSON.parse(data);
        if (data != null){
            divTabela.innerHTML = "<h1>[Predmet]: " + podaci.predmet + "</h1>" + generisiTabelu(trenutnaSedmica);
            dodajEvente();
        }
    }


    function validacija(podaci) {
        let validirano = true;
        let studenti = podaci.studenti;
        let indexi = studenti.map(element => element.index);
        let prisustva = podaci.prisustva;
        prisustva.forEach(element => {
            if (element.predavanja > podaci.brojPredavanjaSedmicno || element.vjezbe > podaci.brojVjezbiSedmicno)
                validirano = false;
            if (!indexi.includes(element.index))
                validirano = false;
        });
        // Dva ili više studenata sa istim indexom 
        for (var i = 0; i < indexi.length - 1; i++)
            for (var j = i + 1; j < indexi.length; j++)
                if (indexi[i] === indexi[j])
                    return false;
                
        // Student ima više unosa za istu sedmicu
        for (var i = 0; i < prisustva.length; i++){
            for (var j = i + 1; j < prisustva.length; j++){
                if (prisustva[i].sedmica === prisustva[j].sedmica && prisustva[i].index === prisustva[j].index)
                    return false;
            }
        }

        // Ako postoji sedmica između dvije sedmice a da za nju nema prisustva

        let nova = prisustva;
        nova.sort(function(a, b) {
            return a.sedmica - b.sedmica;
        })
        
        for (var i = 0; i < nova.length - 1; i++)
            if (nova[i + 1].sedmica - nova[i].sedmica >= 2)
                return false;

        return validirano;
    }

    function vratiSortiranoPrisustvo(student) {
        zaStudenta = podaci.prisustva.filter(p => p.index === student);
        zaStudenta.sort(function(a, b) {
            return a.sedmica - b.sedmica;
        });
        for (var i = 0; i < zaStudenta.length - 1; i++){
            if (zaStudenta[i].sedmica - zaStudenta[i + 1].sedmica <= -2)
                zaStudenta.splice(i + 1, 0, {
                    sedmica: zaStudenta[i].sedmica + 1,
                    predavanja: -1,
                    vjezbe: -1,
                    index: student
                });
        }
        for (var i = zaStudenta.length; i < brojSedmica; i++)
            zaStudenta.splice(i + 1, 0, {
                sedmica: zaStudenta[i - 1].sedmica + 1,
                predavanja: -1,
                vjezbe: -1,
                index: student
            });
        return zaStudenta;
    }

    function romanize (num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                   "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    function zadnjaSedmica(prisustva) {
        return Math.max.apply(Math, prisustva.map(function(o) { return o.sedmica; }))
    }

    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
