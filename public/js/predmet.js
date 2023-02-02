function init() {
    let pozivi = PoziviAjax;
    pozivi.getPredmeti(done);

    let divSadrzaj = document.getElementById("divSadrzaj");
    // Pitanje jedno, kako sada da prezumem podatke vezane za neki predmet, ali hajd skontat će se to nekako nema frke :)

    function done(data, error){
        if (data == null){
            document.getElementById("logoutButton").style.display = "none";
            $("#greskaPoruka").html(error);
        } else {
            console.log(data);
            for (let i = 0; i < data.predmeti.length; i++){
                var predmet = document.createElement("a")
                var li = document.createElement("li");
                predmet.href = "#";
                predmet.innerHTML = data.predmeti[i];
                predmet.onclick = getPrisustvo;
                li.appendChild(predmet);
                $("#lista").append(li);
            }
        }
    }

    function redirectLogout(data, error){
        if (data == null)
            return;
        else 
            window.location.replace("http://localhost:3000/login.html");
    }

    function logout(){
        pozivi.postLogout(redirectLogout);
    }

    function getPrisustvo(e) {
        //e.preventDefault();
        e = e || window.event;
        var target = e.target || e.srcElement,
            text = target.textContent || target.innerText;
        pozivi.getPredmet(text, iscrtajTabelu);
    }

    function iscrtajTabelu(data, error){
        divSadrzaj.innerHTML = "";
        if (data){
            $("#greskaPoruka").html("");
            let tabelaPrisustvo = TabelaPrisustvo(divSadrzaj, JSON.parse(data));
            //dodajEvente();
        } else {
            $("#greskaPoruka").html("Podaci o prisustvu nisu dostupni");
        }
    }

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

    document.getElementById("logoutButton").onclick = logout;
 } 
 window.onload = init;