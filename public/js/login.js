function init() {
    let pozivi = PoziviAjax;
    redirectIfLogged();
    $("#submitLogin").click(function(event) {
        event.preventDefault();
        console.log("Ovamooo poslato");
        pozivi.postLogin($("#username").val(), $("#password").val(), done);
    });

    function done(data, error){
        if (data == null){
            $("#greskaPoruka").html(error);
        } else {
            window.location.replace("http://localhost:3000/predmet.html");
        }
    }

    function redirectIfLogged(){
        pozivi.isloggedIn(function(){
            window.location.href = "http://localhost:3000/predmet.html";
        });
    }
 } 
 window.onload = init;