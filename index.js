/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/
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


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // grab the element with the id games-container
    const gamesContainer = document.getElementById("games-container");

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="${game.name} Image">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `;

        // append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Ensure this is called after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    addGamesToPage(GAMES_JSON);
});


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
const totalContributions = GAMES_JSON.reduce( (accumulator, game) => {
    return accumulator + game.backers;
  }, 0);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/ 

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.textContent = totalContributions.toLocaleString();

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// update the raised card with the total amount raised, formatted with a dollar sign
raisedCard.textContent = `$${totalRaised.toLocaleString()}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = GAMES_JSON.length.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // first, delete all current child elements in the gamesContainer
    const gamesContainer = document.getElementById("games-container");

    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
   
    // console.log("Number of unfunded games:", unfundedGames.length);
    // use the addGamesToPage function to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// initial call to display all games
// addGamesToPage(GAMES_JSON);
function filterFundedOnly() {
    const gamesContainer = document.getElementById("games-container");

    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
      const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
      
    //   console.log("Number of funded games:", fundedGames.length);
    // use the function we previously created to add unfunded games to the DOM
   addGamesToPage(fundedGames);
}

// // Initial call to display all games
// addGamesToPage(GAMES_JSON);
// show all games
function showAllGames() {
    const gamesContainer = document.getElementById("games-container");
    
    deleteChildElements(gamesContainer);

    // console.log("Total number of games:", GAMES_JSON.length);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

    // Your JavaScript code here
    const unfundedBtn = document.getElementById("unfunded-btn");
    unfundedBtn.addEventListener('click', filterUnfundedOnly);

    const fundedBtn = document.getElementById("funded-btn");
    fundedBtn.addEventListener('click', filterFundedOnly);

    const allBtn = document.getElementById("all-btn");
    allBtn.addEventListener('click', showAllGames);

  



// select each button in the "Our Games" section
// const unfundedBtn = document.getElementById("unfunded-btn");
// unfundedBtn.addEventListener('click', filterUnfundedOnly);
// const fundedBtn = document.getElementById("funded-btn");

// fundedBtn.addEventListener('click', filterFundedOnly);
// const allBtn = document.getElementById("all-btn");

// // add event listeners with the correct functions to each button

// allBtn.addEventListener('click', showAllGames);

// /*************************************************************************************
//  * Challenge 6: Add more information at the top of the page about the company.
//  * Skills used: template literals, ternary operator
// */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);
console.log(`Number of unfunded games: ${unfundedGamesCount}`);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total amount of $${totalRaised.toLocaleString()} was raised for ${GAMES_JSON.length} games  .As of now ${unfundedGamesCount} remains unfunded ${unfundedGamesCount !== 1 ? '' : ''}. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const summaryElement = document.createElement('p');
    summaryElement.textContent = displayStr;

    // Append the new element to the description container
 descriptionContainer.appendChild(summaryElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [topGame, runnerUpGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("div");
topGameElement.innerHTML = `
    <h3>${topGame.name}</h3>
`;

// Append the new element to the firstGameContainer
firstGameContainer.appendChild(topGameElement);

// Create a new element for the runner-up game
const runnerUpGameElement = document.createElement("div");
runnerUpGameElement.innerHTML = `
    <h3>${runnerUpGame.name}</h3>
`;

// Append the new element to the secondGameContainer
secondGameContainer.appendChild(runnerUpGameElement);


// // do the same for the runner up item

