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

var closeWelcome = document.getElementById('close_welcome').addEventListener('click', function() {
    document.getElementById('welcome').style.display = 'none';

});

// select character
window.addEventListener('charSelection', function (e) { 
   
    window.addEventListener('DOMContentLoaded', function () {
    
        newGame.loadHeroes();

    });
});


// play game
playButton.addEventListener('click', function() {
    document.getElementById("page01").style.display = 'none';
    document.getElementById("page02").style.display = 'block';
    window.dispatchEvent(startGameEvent);
});

// clear character selection
clearButton.addEventListener('click', function() {
    newGame.players[0] = null;
    newGame.players[1] = null;

    var houses = document.getElementsByClassName('house');

    for (var i = 0;i < houses.length; i++) {
        houses[i].style.backgroundImage = "url('/assets/images/house_background.png')";
    }
    
    document.getElementById('playButton').disabled = true;
});

// start game
window.addEventListener('startGame', function (e) { 

        // set yellow dots coordinates
        newGame.yellowDots = [
            {num: 1, x: 1380, y: 2500, trap: false},
            {num: 2, x: 1280, y: 2500, trap: false },
            {num: 3, x: 1180, y: 2490, trap: false },
            {num: 4, x: 1080, y: 2470, trap: false },
            {num: 5, x: 1000, y: 2420, trap: false },
            {num: 6, x: 980, y: 2320, trap: false },
            {num: 7, x: 1020, y: 2230, trap: false },
            {num: 8, x: 1110, y: 2190, trap: false },
            {num: 9, x: 1200, y: 2160, trap: false },
            {num: 10, x: 1190, y: 2080, trap: false },
            {num: 11, x: 1130, y: 2020, trap: false },
            {num: 12, x: 1070, y: 1950, trap: false },
            {num: 13, x: 1000, y: 1900, trap: false },
            {num: 14, x: 900, y: 1900, trap: false },
            {num: 15, x: 800, y: 1900, trap: false },
            {num: 16, x: 720, y: 1860, trap: false },
            {num: 17, x: 700, y: 1780, trap: false },
            {num: 18, x: 710, y: 1700, trap: false },
            {num: 19, x: 790, y: 1670, trap: false },
            {num: 20, x: 870, y: 1630, trap: false },
            {num: 21, x: 910, y: 1540, trap: false },
            {num: 22, x: 910, y: 1440, trap: false },
            {num: 23, x: 940, y: 1320, trap: false },
            {num: 24, x: 960, y: 1200, trap: false },
            {num: 25, x: 1000, y: 1110, trap: false },
            {num: 26, x: 1000, y: 1000, trap: false },
            {num: 27, x: 1010, y: 900, trap: false },
            {num: 28, x: 1000, y: 800, trap: false },
            {num: 29, x: 1000, y: 700, trap: false },
            {num: 30, x: 1000, y: 600, trap: false },
        ];
        
    // set initial player
    newGame.currentPlayer = 0;
    newGame.createCanvas();
    
    newGame.loadTraps();
    newGame.setupTraps();
    setTimeout(function() {
        newGame.setupPlayer();
        newGame.updateCanvas();    
    }, 500);
});

// a player reached the wall
window.addEventListener('reachGoal', function (e) { 

    flashMessage(newGame.players[newGame.currentPlayer].house.hero.name + " of HOUSE "+ newGame.players[newGame.currentPlayer].house.name +" is the winner!");
    newGame.winner = newGame.players[newGame.currentPlayer].playerNum;
    (newGame.currentPlayer === 1) ? newGame.looser = 0 : newGame.looser = 1;

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

