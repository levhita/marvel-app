    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDBgPgEjpEG4kZqyq1Vnw39bc3Rw-U-Hrc",
        authDomain: "marvel-2.firebaseapp.com",
        databaseURL: "https://marvel-2.firebaseio.com",
        projectId: "marvel-2",
        storageBucket: "marvel-2.appspot.com",
        messagingSenderId: "668439989433"
    };
    firebase.initializeApp(config);
    
    /*var marvel_config = {
        apiKey: "0ab55f3eb3f88236784a773210cfad1b",
    }; */
    
    
    $(document).ready(function(){
        console.log('Página cargada');
        
        
        $("#logout").click(function() {
            console.log('Botón logout clicleado');
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged( function(user){
            console.log("checking login state");
            if (user) {
                console.log("logged in");
                $("#user").text(user.email);
            } else {
                console.log("logged out");
                window.location="index.html";
            }
        } );
       
    });
    
    