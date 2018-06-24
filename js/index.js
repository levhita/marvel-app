$(document).ready(function(){
    var auth = firebase.auth();
    
    $("#login-button").click(function(){
        console.log("Login");
        var email = $("#email-input").val();
        var password = $("#password-input").val();
        auth.signInWithEmailAndPassword(email, password)
        .catch(function(e){
            alert(e.message);
        });
    });

    $("#signup-button").click(function(){
        console.log("Signup");
        var email = $("#email-input").val();
        var password = $("#password-input").val();
        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(e){
            alert(e.message);
        });
    });

    auth.onAuthStateChanged(function(firebaseUser){
        if (firebaseUser) {
            window.location= "app.html";
        }
    });

});