$(document).ready(function(){
    var auth = firebase.auth();
    var firebaseUser = {};
    var characters = [];
    
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
    
    $('#search-input').keydown( function(event) {
        var search = $(this).val();
        console.log(event.which);
        if ( event.which == 13 && search.length > 3 ){
          searchCharacters(search);
          event.preventDefault();
        }
        
    });
    
    function searchCharacters(search){
        search = encodeURIComponent(search);
        $.ajax({
            url: "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+search+"&apikey=" +marvel_config.apiKey,
            success: function( result ) {
                
                var rawCharacters = result.data.results;
                
                
                characters = rawCharacters.map(function(character) {
                    var data = {
                        description: character.description,
                        name: character.name,
                        img: character.thumbnail.path + "." + character.thumbnail.extension,
                        url: character.urls[0].url,
                    }
                    return data;
                });
                
                renderCharacters();
            }
        });
    }

    function renderCharacters(){
        var $charactersContainer = $("#characters-container");
        $charactersContainer.html("");
        var template = $("#character-template").html();
        characters.forEach(function(character) {
            $charactersContainer.append( fillTemplate(template,character) );
        });
    }

});
