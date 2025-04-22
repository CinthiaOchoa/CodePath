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
    for(let i = 0; i < games.length; i++){
        const game = games[i];
        console.log(game);
         // create a new div element, which will become the game card
        const gameCard = document.createElement("div");
        // add the class game-card to the list
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
        <img src = "${game.img}" class = "game-img"/>
        <h3>${game.name}</h3>
        <p> Backers: ${game.backers}</p>`;
        gamesContainer.appendChild(gameCard);

    }
    }
    const showAllGame = GAMES_JSON;
 addGamesToPage(showAllGame);
    
        // set the inner HTML using a template literal to display some info 
        // about each game

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContribution = GAMES_JSON.reduce((total,game) => {
   return total + game.backers;
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContribution.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
},0);

// set inner HTML using template literal
raisedCard.innerHTML = `${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // function filterUnfundedOnly() {
    //     deleteChildElements(gamesContainer);
    
        // Get only games where pledged amount is less than the goal
        const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    
        // 🔑 Secret Key - Log how many games are unfunded
        console.log("Unfunded games:", unfundedGames.length);
    
        // Add them to the DOM
        addGamesToPage(unfundedGames);
    }
    


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    console.log("Unfunded games:", fundedGames.length);
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

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfunded = GAMES_JSON.filter(game => game.pledged < game.goal).length;



// create a string that explains the number of unfunded games using the ternary operator
const descriptionStr = `
A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. 
Currently, ${numUnfunded} ${numUnfunded === 1 ? "game remains" : "games remain"} unfunded. 
We need your help to fund these amazing games!
`;



// create a new DOM element containing the template string and append it to the description container

const descriptionElement = document.createElement("p");
descriptionElement.innerText = descriptionStr;
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
// Step 1: Sort the games by most funded
// Sort the games from highest to lowest funded
// ✅ Step 1: Calculate the top games
// Sort games by pledged amount
// Sort games by amount pledged
// Sort the games from highest to lowest funded
const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

const [firstGame, secondGame] = sortedGames;

// Get container divs
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Create and append <p> tags with name and pledge amount
const firstGameName = document.createElement("p");
firstGameName.textContent = `${firstGame.name} — $${firstGame.pledged.toLocaleString()}`;
firstGameContainer.appendChild(firstGameName);

const secondGameName = document.createElement("p");
secondGameName.textContent = `${secondGame.name} — $${secondGame.pledged.toLocaleString()}`;
secondGameContainer.appendChild(secondGameName);




// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element
// Destructure the first two games from the sorted list


// Create new elements for the top two games

// Log to find the 🔑 Secret Key components

