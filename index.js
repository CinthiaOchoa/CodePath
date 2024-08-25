/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

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

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    // create a new div element, which will become the game card
    const div = document.createElement("div");

    div.classList.add("game-card");
    //div.classList.add("game-card");

    // add the class game-card to the list

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    div.innerHTML = `<img src = ${games[i]["img"]} />
        <h3>${games[i]["name"]}</h3>
        <p>${games[i]["description"]}</p>
        <p> Pledged: $${games[i]["pledged"]}</p>
        <p>Goal: $${games[i]["goal"]}</p>
        <p>Backers: ${games[i]["backers"]}</p>`;

    const gameCon = document.getElementById("games-container");

    gameCon.append(div);
    // append the game to the games-container
  }
}

addGamesToPage(GAMES_JSON);
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
const totalCont = GAMES_JSON.reduce((total, GAMES_JSON) => {
  return total + GAMES_JSON["backers"];
}, 0);

//function to add commas in numbers (also used later)
function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const totalCont1 = addCommas(totalCont);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalCont1}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalrai = GAMES_JSON.reduce((total, GAMES_JSON) => {
  return total + GAMES_JSON["pledged"];
}, 0);

const totalrai1 = addCommas(totalrai);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalrai1}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalgames = GAMES_JSON.reduce((total, GAMES_JSON) => {
  return total + 1;
}, 0);

gamesCard.innerHTML = `${totalgames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfunded = GAMES_JSON.filter((games) => {
    return games["pledged"] < games["goal"];
  });

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  const funded = GAMES_JSON.filter((games) => {
    return games["pledged"] > games["goal"];
  });

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(funded);
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
unfundedBtn.onclick = filterUnfundedOnly;
fundedBtn.onclick = filterFundedOnly;
allBtn.onclick = showAllGames;

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use reduce to count the number of unfunded games
const totalUnfunded = GAMES_JSON.reduce(
  (total, game) => (game["pledged"] < game["goal"] ? total + 1 : total),
  0
);

const totalUnfundedmoney = GAMES_JSON.reduce(
  (total, game) => total + game["pledged"],
  0
);

const totalUnfundedMoney1 = addCommas(totalUnfundedmoney);
// create a string that explains the number of unfunded games using the ternary operator
let text = `A total of $${totalUnfundedMoney1} has been raised for 11 games. Currently, ${totalUnfunded} games are unfunded. We need your help to fund these awesome games.`;

// create a new DOM element containing the template string and append it to the description container
const flavor = document.createElement("flavortext");
flavor.innerText = text;
descriptionContainer.append(flavor);

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
const [a, b, ...rest] = sortedGames;

function topGame() {
  const bestgame = document.createElement("div");
  bestgame.innerHTML = `<img src = ${a.img} />
        <h3>${a.name}</h3>
        <p>${a.description}</p>
        <p> Pledged: ${a.pledged}</p>`;
  firstGameContainer.append(bestgame);
}

topGame();

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

function runnerup() {
  const bestgame = document.createElement("div");
  bestgame.innerHTML = `<img src = ${b.img} />
        <h3>${b.name}</h3>
        <p>${b.description}</p>
        <p> Pledged: ${b.pledged}</p>`;
  secondGameContainer.append(bestgame);
}

runnerup();

//carousel function

function carousel(games) {
  for (let i = 0; i < games.length; i++) {
    const ul = document.createElement("figure");
    ul.classList.add("carousel-card");
    if (games[i]["name"].length > 25) {
      let tempname = games[i]["name"].slice(0, 25);
      ul.innerHTML = `<img src = ${games[i]["img"]} /><figcaption>${tempname}</figcaption>`;
    } else {
      ul.innerHTML = `<img src = ${games[i]["img"]} /><figcaption>${games[i]["name"]}</figcaption>`;
    }
    const caracontainer = document.getElementById("carousel-container");
    caracontainer.append(ul);
  }
}

carousel(GAMES_JSON);

//All code past this was code for potential features that can be implemented but not complete

function filterAlmostfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfunded = GAMES_JSON.filter((games) => {
    return games["pledged"] < games["goal"];
  });

  const left = unfunded.map((games) => {
    return games["goal"] - games["pledged"];
  });

  const almostfunded = left.sort((a, b) => a - b);

  let almostfundedFinal = [];

  for (let i = 0; i < almostfunded.length; i++) {
    for (let j = 0; j < unfunded.length; j++) {
      if (almostfunded[i] == unfunded[j]["goal"] - unfunded[j]["pledged"]) {
        almostfundedFinal.push(unfunded[i]);
      }
    }
  }
  addGamesToPage(almostfundedFinal);
}

//<button id="almost-funded-btn">Show Almost Funded</button>

//const almostFunded = document.getElementById("almost-funded-btn");
//almostFunded.onclick = filterAlmostfundedOnly;

//            <option value="Swiss Franc">CHF</option>
//            <option value = "British Pound">GPB</option>
//            <option value = "Kuwaiti Dinar">KWD</option>
//            <option value = "Japanese yen">YEN</option>
//<div class = "currencies"></div>
//        <label for="currency">Currency: </label>
//          <select name="currency" id="currency">
//            <option value="USD">USD</option>
//            <option id = "Euro" value="Euro">EURO</option>
//          </select>
//    </div>

function ConvertToEuro() {
  deleteChildElements(gamesContainer);
  function addGamesToPageEuro(games) {
    for (let i = 0; i < games.length; i++) {
      const div = document.createElement("div");
      div.classList.add("game-card");
      let pledges = Math.ceil(games[i]["pledged"] * 0.93);
      let goals = Math.ceil(games[i]["goal"] * 0.93);
      div.innerHTML = `<img src = ${games[i]["img"]} />
                            <h3>${games[i]["name"]}</h3>
                            <p>${games[i]["description"]}</p>
                            <p> Pledged: £${pledges}</p>
                            <p>Goal: £${goals}</p>
                            <p>Backers: ${games[i]["backers"]}</p>`;
      const gameCon = document.getElementById("games-container");
      gameCon.append(div);
    }
  }

  addGamesToPageEuro(GAMES_JSON);
}

//const euro = document.getElementById("currency");
//euro.onchange = ConvertToEuro;

//from almostfunded
//unfunded.forEach(element => {almostFunded.append([])});

//let almostFunded = [];
//almostFunded.append(unfunded[0][goal]-unfunded[0][pledged]);
//for (i = 1; i < unfunded.size(); i++) {
//    let left = unfunded[i][goal] - unfunded[i][pledged];
//    for (j = 0; j < almostFunded.size(); j++) {
//        if (left < almostFunded[j]) {
//
//        }
//    }
//}

//addGamesToPage(unfunded);
