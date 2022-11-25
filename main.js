// Fokusoidaan hakukenttä heti kun sivu lataa, että voi alkaa etsimään pokemona ilman että tarvitsee klikata hakukohtaa.
window.onload = document.getElementById("search").select();

// Luodaan tarvittavat muuttujat ja annetaan niille arvot, jotka ei muutu myöhemmin.
var character;
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
var search = document.getElementById("search");

/**  
 * Otetaan vastaan hakukentän tulos, trimmataan välilyönnit alusta ja lopusta pois, sekä muutetaan teksti pieniksi kirjaimiski.
 * Sitten lähetetään hakutulos funktioon loadJSON().
 **/

function searchFunction() {
    document.getElementById("results").innerHTML = "";
    var hakusana = search.value;
    hakusana = hakusana.trim();
    character = hakusana.toLowerCase();
    search.value = "";
    loadJSON();
}

/** 
 * Luodaan async-funktio, joka ottaa vastaan aikasemmin määritellyn api-linkin
 * ja lisää sen perään hakutuloksesta saadun pokemonin nimen.
 *
 * Haetaan APIn tulos await fetch-komennolla ja muotoillaan tulos JSON-muotoon .json()-komennolla.
 * Sitten lähetetään tulos showPokemon-funktioon.
 **/

async function loadJSON() {
    if (character != undefined) {
        var url = `${pokemonUrl}` + character;
        const response = await fetch(url);
        const cleaned = await response.json();
        showPokemon(cleaned);
    }
}

/**
 * Otetaan vastaan loadJSON()-funktiosta lähetetyn "cleaned"-muuttujan json-sisältö.
 * Luodaan muuttujat tyypille ja abilitylle.
 * Loopataan kaikkien tyyppien ja abilitien läpi, ja lisätään ne omiin muuttujiinsa.
 */

async function showPokemon(cleaned) {
    let type, ability;
    for (let i in cleaned.types) {
        type += cleaned.types[i].type.name + " ";
    }
    for (let i in cleaned.abilities) {
        ability += cleaned.abilities[i].ability.name + " ";
    }
    // Koska api palauttaa ensimmäisenä "Undefined", karsitaan tekstin ensimmäiset 9 kirjainta pois substring(9)-metodilla
    type = type.substring(9);
    // Joissain ability-nimissä on viiva välilyönnin sijaan, niin korvataan viivat välilyöneillä globaalisti replace()-metodilla
    type = type.replace(/-/g, " ");
    ability = ability.substring(9);
    ability = ability.replace(/-/g, " ");
    // Tehdään nimen ensimmäisestä kirjaimesta iso, ja liitetään loput tekstistä uudelleen perään
    let name = cleaned.name.charAt(0).toUpperCase() + cleaned.name.slice(1);
    // Tyhjennetään hakukenttä
    search.value = "";
    // Luodaan uusi div nimeltä pokemon, jonka sisälle tulee Name, Ability ja Type, sekä kuva perään vielä
    document.getElementById("results").innerHTML = `
    <div class = "pokemon">
        <div class = "combinedPokemon">
            <h3 class = "pokemen">Name: ${name}</h3>
            <h3 class = "pokemen">Ability: ${ability}</h3>
            <h3 class = "pokemen">Type: ${type}</h3>
            <img src="${cleaned.sprites.front_default}" id="pokemonImage"></img>
        </div>
    </div>
    `;
}

// Luodaan eventlistener seuraamaan hakukenttän napinpainalluksia, jotta saadaan haku alkamaan myös vain painamalla enteriä
search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});
