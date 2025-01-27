/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
// Updated addGamesToPage function with the loop
function addGamesToPage(games) {
    // loop over each item in the data
    for (let game of games) {
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // add the class game-card to the div's class list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;

        // grab the element with the id games-container
        const gamesContainer = document.getElementById("games-container");

        // append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the GAMES_JSON variable to add all games to the page
addGamesToPage(GAMES_JSON);




// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

// Step 1: Calculate total contributions
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// Set the inner HTML of the contributions card with the result
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Step 2: Calculate total raised amount
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Set the inner HTML of the raised card with the result
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Step 3: Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Set the inner HTML of the games card with the total number of games
gamesCard.innerHTML = totalGames.toLocaleString();





/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
    // Log the result to see how many unfunded games there are
    console.log(unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the result to see how many funded games there are
    console.log(fundedGames);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Event listeners for buttons
unfundedBtn.addEventListener("click", filterUnfundedOnly);  // Button for unfunded games
fundedBtn.addEventListener("click", filterFundedOnly);      // Button for funded games
allBtn.addEventListener("click", showAllGames);             // Button for all games


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

console.log("Number of unfunded games:", unfundedGamesCount);

// use filter or reduce to count the number of funded games
const fundedGamesCount = GAMES_JSON.filter(game => game.pledged >= game.goal).length;

// Log the funded games count to check
console.log("Number of funded games:", fundedGamesCount);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${fundedGamesCount} games. Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund these amazing games!`;

// Log the result or use it as needed
console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container
// create a new paragraph element
const descriptionText = document.createElement("p");

// set the inner HTML of the paragraph element to the display string
descriptionText.innerHTML = displayStr;

// append the newly created paragraph to the descriptionContainer
descriptionContainer.appendChild(descriptionText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;

// Log the names of the top 2 funded games to check
console.log("Top Game:", topGame.name);
console.log("Second Game:", secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
// create a new element to hold the name of the top pledged game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = `Top Funded Game: ${topGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
// create a new element to hold the name of the second most funded game, then append it to the correct element
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = `Second Funded Game: ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);

// Add a golden highlight color to the top-games container
const topGamesContainer = document.getElementById("top-games");
topGamesContainer.style.backgroundColor = "#4B006E"; // Purple color for the background

// Highlight the individual game containers
firstGameContainer.style.backgroundColor = "#FFD700"; // Golden color for top game
secondGameContainer.style.backgroundColor = "#C0C0C0"; // Silver color for runner-up



