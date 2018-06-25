$(document).ready(function(){
    var auth = firebase.auth();

    auth.onAuthStateChanged(function(firebaseUser){
        if (!firebaseUser) {
            window.location= "index.html";
        } else {
            window.firebaseUser = firebaseUser;
            $("#user-email").text(firebaseUser.email);
        }
    });
    
    $("#logout-button").click(function(){
        auth.signOut();
    })
    
    $("#img-button").click(function(){
        console.log("sdfsdfsdf");
        var file = document.getElementById("img-file").files[0];
        var storageRef = firebase.storage().ref('test/'+file.name);
        var uploadTask = storageRef.put(file);
        
        uploadTask.on("state_changed",
            function(snapshot){
                console.log("progress");
                var percentage = Math.floor(snapshot.bytesTransferred/snapshot.totalBytes*100);
                $("#upload-progress").css("width", percentage+"%");
            },
            function(e){
                console.log("error", e);
            },
            function(){
                console.log("completed");
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    $("#uploaded").attr("src",downloadURL);
                });
            },
        )

    });

});
