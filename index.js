// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game in games) {
        let div = document.createElement("div");
        div.classList.add("game-card");

        div.innerHTML = `
            <img class="game-img" src="${games[game]["img"]}" /">
            <h3>${games[game]["name"]}</h3>
            <p>${games[game]["description"]}</p>
            <p>BACKERS: ${games[game]["backers"]}</p>`;

        addProgressBar(div, games[game]); // ADDED FEATURE

        gamesContainer.appendChild(div);
    }
}

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let backers = GAMES_JSON.reduce((acc, game) => {
    return acc + game["backers"];
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${backers.toLocaleString("en-US")}</p>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game["pledged"];
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString("en-US")}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<p>${GAMES_JSON.length}</p>`;

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((game) => {
        return game["pledged"] < game["goal"];
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);

    addEventListenersToCards(); // CUSTOM FEATURE
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game) => {
        return game["pledged"] >= game["goal"];
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);

    addEventListenersToCards(); // CUSTOM FEATURE
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    addEventListenersToCards(); // CUSTOM FEATURE
}

showAllGames(); // all games shown initially

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numOfUnfunded = GAMES_JSON.reduce((acc, game) => {
    return game["pledged"] < game["goal"] ? acc + 1 : acc;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const oneGameUnfunded = `A total of $${totalRaised.toLocaleString()} has been raised for 
${
    GAMES_JSON.length
} games. Currently, 1 game remains unfunded. We need your help to fund these 
amazing games!`;

const multipleGamesUnfunded = `A total of $${totalRaised.toLocaleString()} has been raised 
for ${
    GAMES_JSON.length
} games. Currently, ${numOfUnfunded} games remain unfunded. We need 
your help to fund these amazing games!`;

const displayStr = numOfUnfunded == 1 ? oneGameUnfunded : multipleGamesUnfunded;

// create a new DOM element containing the template string and append it to the description container
let description = document.createElement("p");
description.innerHTML = displayStr;
descriptionContainer.appendChild(description);

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [topFunded, runnerUp] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let topFundedName = document.createElement("p");
topFundedName.textContent = topFunded.name;
firstGameContainer.appendChild(topFundedName);

// do the same for the runner up item
let runnerUpName = document.createElement("p");
runnerUpName.textContent = runnerUp.name;
secondGameContainer.appendChild(runnerUpName);

// CUSTOM FEATURE: INDIVIDUAL GAME PROGRESS BARS
function addProgressBar(gameCardHTML, game) {
    let progressBarCont = document.createElement("div");
    progressBarCont.classList.add("progress-bar-container");

    let progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBarCont.innerHTML = `<p class="progress-text">RAISED $${game[
        "pledged"
    ].toLocaleString()}</p>`;

    updateProgressBar(progressBar, game["pledged"], game["goal"]);

    progressBarCont.appendChild(progressBar);
    gameCardHTML.appendChild(progressBarCont);
}

function updateProgressBar(progressBar, pledged, goal) {
    let percentage = (pledged / goal) * 100;
    if (percentage > 100) {
        percentage = 100; // Cap the percentage at 100%
    }
    progressBar.style.width = percentage + "%";
}

function addEventListenersToCards() {
    document.querySelectorAll(".game-card").forEach((gameCard) => {
        gameCard.addEventListener("mouseover", () => {
            gameCard.classList.add("show-progress");
        });
        gameCard.addEventListener("mouseout", () => {
            gameCard.classList.remove("show-progress");
        });
    });
}
