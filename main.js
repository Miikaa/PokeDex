// Fokusoidaan dropdown heti kun sivu lataa, että voi alkaa etsimään henkilöä ilman klikkausta.
window.onload = document.getElementById("search").select();

// Luodaan tarvittavat muuttujat ja annetaan niille arvot, mitkä ei muutu myöhemmin.
var character;
const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
var search = document.getElementById("search");

// Sama kuin aikasemmin, mutta tällä kertaa hakukenttä eikä dropdown.
function searchFunction() {
    document.getElementById("results").innerHTML = "";
    var hakusana = search.value;
    hakusana = hakusana.trim();
    character = hakusana.toLowerCase();
    search.value = "";
    loadJSON();
}

/** Luodaan async-funktio, joka ottaa vastaan aikasemmin määritellyn linkin
 *  ja lisää sen perään hakutuloksesta saadun henkilön nimen.
 *
 * Haetaan APIn tulos await fetch-komennolla ja muotoillaan tulos JSON-muotoon .json()-komennolla.
 * Sitten lähetetään tulos showQuote-funktioon.
 **/

async function loadJSON() {
    if (character != undefined) {
        var url = `${pokemonUrl}` + character;
        const response = await fetch(url);
        const cleaned = await response.json();
        showSearchQuote(cleaned);
    }
}

async function showSearchQuote(cleaned) {
    let type, ability;
    for (let i in cleaned.types) {
        type += cleaned.types[i].type.name + " ";
    }
    for (let i in cleaned.abilities) {
        ability += cleaned.abilities[i].ability.name + " ";
    }
    type = type.substring(9);
    type = type.replace(/-/g, " ");
    ability = ability.substring(9);
    ability = ability.replace(/-/g, " ");

    let name = cleaned.name.charAt(0).toUpperCase() + cleaned.name.slice(1);
    search.value = "";
    document.getElementById("results").innerHTML = `
    <div class = "quotes">
        <div class = "combinedQuotes">
            <h3 class = "quote">Name: ${name}</h3>
            <h3 class = "quote">Ability: ${ability}</h3>
            <h3 class = "quote">Type: ${type}</h3>
            <img src="${cleaned.sprites.front_default}" id="pokemonImage"></img>
        </div>
    </div>
    `;
}

// Luotiin event listener kuuntelemaan napin painalluksia, ja jos painaa enteriä, simuloidaan napin painallus.
search.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});
