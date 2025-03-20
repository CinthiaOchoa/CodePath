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
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
        <img class="game-img" src="${games[i].img}" alt="${games[i].name}" />
        <h3>${games[i].name}</h3>
        <p><strong>Goal:</strong> $${games[i].goal.toLocaleString()}</p>
        <p><strong>Backers:</strong> ${games[i].backers.toLocaleString()}</p>
    `;

    // Append the game card to the gamesContainer
    gamesContainer.appendChild(gameCard);
    }

    
}

addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
// Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// Set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    <p>${totalContributions.toLocaleString()}</p>
`;

// Grab the amount raised card element
const raisedCard = document.getElementById("total-raised");

// Use reduce() to calculate the total amount pledged across all games
const totalRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// Log the totalRaised value to verify the calculation
console.log("Total Raised:",totalRaised);

// Set the inner HTML of the raisedCard element using a template literal and toLocaleString to format the number with commas
raisedCard.innerHTML = `
    <p> $${totalRaised.toLocaleString()}</p>
`;

// Grab the element where the total number of games will be displayed
const gamesCard = document.getElementById("num-games");

// Use reduce() to calculate the total number of games
const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc + 1; // Increment the count for each game
}, 0);

// Log the totalGames value to verify the calculation
console.log("Total number of games:", totalGames);

// Set the inner HTML of the gamesCard element using a template literal
gamesCard.innerHTML = `
    <p>${totalGames.toLocaleString()}</p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    console.log(filterFundedOnly);
}
filterUnfundedOnly();

function filterFundedOnly() {
    // Clear the games container
    deleteChildElements(gamesContainer);

    // Filter games where pledged >= goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games
    console.log("Number of funded games:", fundedGames.length);

    // Add the funded games to the DOM
    addGamesToPage(fundedGames);
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);    
        addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Event listener for the "Show Unfunded Only" button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Event listener for the "Show Funded Only" button
fundedBtn.addEventListener("click", filterFundedOnly);

// Event listener for the "Show All Games" button
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numberOfUnfundedGames = unfundedGames.length;

console.log("Number of unfunded games:", numberOfUnfundedGames);

// create a string that explains the number of unfunded games using the ternary operator

const explanation = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames === 1 ? '' : 's'}. 
    This incredible support from the community highlights the passion and dedication towards bringing these projects to life. 
    
`;

console.log(explanation);

// create a new DOM element containing the template string and append it to the description container

const paragraph = document.createElement("p");

// Set the inner text of the paragraph to the explanation string
paragraph.innerText = explanation;

// Add the paragraph to the description container
descriptionContainer.appendChild(paragraph);

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
const [firstGame, secondGame, ...rest] = sortedGames;

// Log the top 2 games to verify
console.log("Top Game:", firstGame.name);
console.log("Second Game:", secondGame.name);

// Create elements to hold the names of the top 2 games
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;

const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;

// create a new element to hold the name of the top pledge game, then append it to the correct element

firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);

