const PoziviAjax = (()=>{

    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
        // Ovdje sad treba dodati da kada mu se pošalje naziv predmeta da ga uzme i da preko toga preuzime prisustvo iz prisustva.json a sve to preko index.js rute :)
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                console.log("Uspješan poziv");
                fnCallback(ajax.responseText, null);
            }
        }
        ajax.open("GET", "http://localhost:3000/predmet/" + naziv, true);
        ajax.send();
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
        $.get("/predmeti", function(data, status){
            console.log(status);
            fnCallback(data, null);
        }).fail(function(xhr, status, error){
            fnCallback(null, xhr.responseJSON.greska);
        });
    }
    function impl_postLogin(username,password,fnCallback){
        /*$.post("/login", { username: username, password: password}, function(data, result){
            fnCallback(data, null);
        }).fail(function(xhr, status, error){
            fnCallback(null, xhr.responseJSON.poruka);
        });*/
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {// Anonimna funkcija
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(ajax.responseText, null);
            if (ajax.readyState == 4 && ajax.status == 401)
                fnCallback(null, JSON.parse(ajax.responseText).poruka);
        }
        ajax.open("POST", "http://localhost:3000/login", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send("username=" + username + "&password=" + password);
    }
    function impl_postLogout(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(ajax.responseText, null);
            else 
                fnCallback(null, ajax.responseText);
        }
        ajax.open("POST", "http://localhost:3000/logout", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            //console.log("RISPONSE JE: ", ajax);
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(ajax.responseText, null);
            else {
                fnCallback(null, ajax.responseText);
            }
        }
        ajax.open("POST", "http://localhost:3000/prisustvo/predmet/" + naziv + "/student/" + index, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(prisustvo));
    }

    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();
