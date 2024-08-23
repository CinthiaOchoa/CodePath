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

        // create a new div element, which will become the game card
        const gameInfo = document.createElement("div");
        gameInfo.classList.add("game-card");
        gameInfo.innerHTML = `  
                                <img src=${games[i].img} class="game-img"></img> 
                                <h1>${games[i].name}</h1>
                                <h2>Description: ${games[i].description}</h2>
                                <h3>Goal: $${games[i].goal.toLocaleString('en-US')}</h3>`


        gamesContainer.appendChild(gameInfo);

// add the class game-card to the list
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON)

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumilator, games) => {
    return accumilator + games.backers;
}, 0)
console.log(totalContributions)
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML= `<p>${totalContributions.toLocaleString('en-US')}</p>`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((accumilator, games) => {
    return accumilator + games.pledged;
}, 0)
console.log(totalRaised)

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString('en-US')}</p>`


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames= GAMES_JSON.reduce((accumilator) => {
    return accumilator + 1
}, 0)
console.log(totalGames)

gamesCard.innerHTML= `<p>${totalGames}</p>`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((games) => {
        return games.pledged < games.goal
    })
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames= GAMES_JSON.filter((games) => {
        return games.pledged >= games.goal
    })
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");



// add event listeners with the correct functions to each button
    unfundedBtn.addEventListener("click", filterUnfundedOnly)
    fundedBtn.addEventListener("click", filterFundedOnly)
    allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.reduce((accumilator, games) => {
    if (games.pledged < games.goal){
        return accumilator + 1
    }
    return accumilator + 0
}, 0)

// create a string that explains the number of unfunded games using the ternary operator
const descriptionString = `<p>A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${totalGames}. ${numOfUnfundedGames != 0 ? `Currently ${numOfUnfundedGames} games remain unfunded. We need your help funding these amazing games.` : `all games have been funded :D`}`

// create a new DOM element containing the template string and append it to the description container
const newDOMDescription= document.createElement("div")
    newDOMDescription.innerHTML = descriptionString
    
    descriptionContainer.appendChild(newDOMDescription)

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
let [firstBest, secondBest, ...remainingGames] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const bestFirstGame = document.createElement("div")
    bestFirstGame.innerHTML= `<img src=${firstBest.img} class="game-img"></img>
                          <p>${firstBest.name}</p>
                          <p>${firstBest.description}</p>
                          <p>Pledged: ${firstBest.pledged.toLocaleString('en-US')}</p>
                          <p>Goal: $${firstBest.goal.toLocaleString('en-US')}</p>
                          <p>Backers: ${firstBest.backers.toLocaleString('en-US')}</p>`
    firstGameContainer.appendChild(bestFirstGame)

// do the same for the runner up item
const bestSecondGame = document.createElement("div")
    bestSecondGame.innerHTML= `<img src=${secondBest.img} class="game-img"></img>
                               <p>${secondBest.name}</p>
                               <p>${secondBest.description}</p>
                               <p>Pledged: ${secondBest.pledged.toLocaleString('en-US')}</p>
                               <p>Goal: $${secondBest.goal.toLocaleString('en-US')}</p>
                               <p>Backers: ${secondBest.backers.toLocaleString('en-US')}</p>`
    secondGameContainer.appendChild(bestSecondGame)



//Search-bar code

const searchInput = document.getElementById("game-input");
searchInput.addEventListener('change', (e) =>{
        if (e.target.value.length > 1) {
            deleteChildElements(gamesContainer)
            addGamesToPage(GAMES_JSON.filter((games) => {return games.name.toLowerCase().startsWith(e.target.value.toLowerCase())}))
        }
        else {
            deleteChildElements(gamesContainer)
            addGamesToPage(GAMES_JSON)
        }
})
