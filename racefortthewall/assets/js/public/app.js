"use strict";

/* MAIN JavaScript File */

var charSelectionButton = document.getElementById("charSelection");
var diceButton = document.getElementById("dice");

/* Handling events for the different pages */

/* page01 events */
var startGameEvent = new Event('startGame');
var charSelectionEvent = new Event('charSelection');

/* page03 events */
var reachGoalEvent = new Event('reachGoal');
var winnerScreenEvent = new Event('winnerScreen');

/* page02 events */
var trapEvent = new Event('trap');

/* Event listener functions */

var closeWelcome = document.getElementById('close_welcome').addEventListener('click', function () {
    document.getElementById('welcome').style.display = 'none';
});

// select character
window.addEventListener('charSelection', function (e) {

    window.addEventListener('DOMContentLoaded', function () {

        newGame.loadHeroes();
    });
});

// play game
playButton.addEventListener('click', function () {
    document.getElementById("page01").style.display = 'none';
    document.getElementById("page02").style.display = 'block';
    window.dispatchEvent(startGameEvent);
});

// clear character selection
clearButton.addEventListener('click', function () {
    newGame.players[0] = null;
    newGame.players[1] = null;

    var houses = document.getElementsByClassName('house');

    for (var i = 0; i < houses.length; i++) {
        houses[i].style.backgroundImage = "url('/assets/images/house_background.png')";
    }

    document.getElementById('playButton').disabled = true;
});

// start game
window.addEventListener('startGame', function (e) {

    // set initial player
    newGame.currentPlayer = 0;
    newGame.createCanvas();

    newGame.loadTraps();
    newGame.setupTraps();
    setTimeout(function () {
        newGame.setupPlayer();
        newGame.updateCanvas();
    }, 500);
});

// a player reached the wall
window.addEventListener('reachGoal', function (e) {

    flashMessage(newGame.players[newGame.currentPlayer].house.hero.name + " of HOUSE " + newGame.players[newGame.currentPlayer].house.name + " is the winner!");
    newGame.winner = newGame.players[newGame.currentPlayer].playerNum;
    newGame.currentPlayer === 1 ? newGame.looser = 0 : newGame.looser = 1;

    console.log();

    setTimeout(newGame.scoreTime, 1000);
});

// a player came to a tile with a trap
window.addEventListener('trap', function (e) {
    newGame.flashTrapMessage();
    setTimeout(trapExecute, 3000);
});

// Start at character selection
window.dispatchEvent(charSelectionEvent);
