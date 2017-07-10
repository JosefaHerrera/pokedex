/*Codigo GIPHY
$(document).ready(function(){
    var dibujarGifs = function(data){
        var gif = "";
        var url = "";
        data.forEach(function(element){
            gif = element.images.downsized_large.url;
            url = element.bitly_gif_url;
            $("#elementos").append(armarTemplate(gif , url));
        });
    }

    var armarTemplate = function(gif,url){
        var t = "<div class='elemento'><img src='" + gif + "'/><a href='"+ url +"'>Ver más</a></div>"
        return t;
    }
    var ajaxGif = function(gif){
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search',
            type: 'GET',
            datatype: 'json',
            data:{
                q : gif,
                api_key : 'dc6zaTOxFJmzC'
            }
        })
        .done(function(response){
            console.log(response);
            dibujarGifs(response.data);
        })
        .fail(function(){
            console.log("error");
        });
    }
    $("#buscar-gif").click(function(event){
        console.log("Entro");
        $("#elementos").empty();
        var gif = $("#gif-text").val();
        ajaxGif(gif);
    });
});*/

/*
$(document).ready(function(){
    $.ajax({
        url: 'http://pokeapi.co/api/v2/pokemon/',
        type: 'GET',
        dataType: 'JSON',
        data: {'limit': '721'},
    })
    .done(function(respuesta){
        apiPokemon(respuesta.results)
    })

    var apiPokemon = function(data){

        data.forEach(function(e){
            var pokeName = e.name;
            $("#").append();
        })
    };

});*/

/*******/


$(document).ready(function() {
    $('.modal').modal();
    var idPokemon = 1;
    $.get('https://pokeapi.co/api/v2/pokedex/1/', function(result) {
        result.pokemon_entries.forEach(function(pokemon) {

            $('.pokemon').append(`<div class="col s3">
                                    <div class="card">
                                        <div class="card-content">
                                                <img class="pokemon-test img-responsive" id="pokemon-${idPokemon}" src="https://img.pokemondb.net/sprites/x-y/normal/${pokemon.pokemon_species.name}.png" alt="Bulbasaur">
                                        </div>
                                        <div class="card-content">
                                            <p class="card-title"> ${pokemon.pokemon_species.name} </p>
                                        </div>
                                       <div class="card-content">
                                            <hr>
                                            <img class="img-pokebola" src="icon/pokeball_gray.png">
                                            <img class="img-heart" src="icon/valentines-heart.png">
                                            <img class="img-data" src="icon/data.png">
                                        </div>
                                    </div>
                                </div>`);

            $('#pokemon-' + idPokemon).click(function(x) {

                var idClickeado = $(this).attr('id');

                var numberPokemon = idClickeado.substr(8, idClickeado.length);

                $.get('https://pokeapi.co/api/v2/pokemon-species/' + numberPokemon + '/', function(response) {

                    console.log('data ->', response);
                    // informacion correspondiente de cada pokemon
                    var tipos = '';

                    response.egg_groups.forEach(function(tipo) {
                        console.log('tipo', tipo.name);
                        tipos += `<a class="waves-effect waves-light btn btn-tipo">${tipo.name}</a>`;
                    });
                    

                    $('#modal1').modal('open');

                    var modal = `<div class="input-field col s6">
                                        <div class="card">
                                            <div class="card-content">
                                                    <img class="pokemon-test img-responsive" src="https://img.pokemondb.net/sprites/x-y/normal/${response.name}.png" alt="">
                                            </div>
                                        <div class="card-content">
                                                <hr>
                                                <img class="img-pokebola" src="icon/pokeball_gray.png">
                                                <img class="img-heart" src="icon/valentines-heart.png">
                                                <img class="img-data" src="icon/data.png">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-field col s6">
                                        <h3 class="center">${response.name}</h3>
                                        <p>${response.flavor_text_entries[9].flavor_text}</p>
                                        <h5> Type </h5>
                                        ${tipos}
                                        <h5> Habitat </h5>
                                        <a class="waves-effect waves-light btn">${response.habitat.name}</a>
                                    </div>`;
                    $('#modal-content').append(modal);
                });
            });
            idPokemon++;
        });
    });
});

