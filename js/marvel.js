$(document).ready(function(){
    console.log(apiKey);

    var apiKey="0ab55f3eb3f88236784a773210cfad1b";
    
    $("#search-button").click(function() {
        console.log("botón de search clicleado");
        var search = $("#search").val();
        
        var $characters = $("#characters");
        $characters.html("<h1>Searching</h1>");
        
        $.ajax({
            url: "https://gateway.marvel.com:443/v1/public/characters?apikey=" + apiKey+"&nameStartsWith="+search,
            success: function(response){
                
                var template = document.getElementById('template-content').innerHTML;    
                console.log(template);
                
                $characters.html("");
               
                response.data.results.forEach(function(character){
                    /**console.log(character);
                    console.log(character.name);**/
                    var data = {
                        name: character.name,
                        description: character.description,
                        img: character.thumbnail.path +"."+character.thumbnail.extension,
                    }
                    console.log(data);
                    var filledTemplate = fillTemplate(template, data);
                    console.log(filledTemplate);
                    $characters.append(filledTemplate);
                });
            }
        });
    
    });






});


function fillTemplate(template, data) {
    for(var index in data){
        var value = data[index];
        template = template.replace(new RegExp('{{'+index+'}}', 'g'), escapeHtml(value) );
    };
    return template;
}

function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}