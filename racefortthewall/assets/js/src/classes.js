'use strict';
/* CLASSES JavaScript File */
 
class Game {



    constructor () {
        this.gameCanvas = document.getElementById("canvas");
        this.canvasContext;
        this.canvasWidth;
        this.canvasHeight;
        this.dotGrid = [];
        this.yellowDots = [];

        this.audioPlayer;

        this.sigilImage1;
        this.sigilImage2;
     
        /* player variables and objects */
        this.currentPlayer = 0;
        this.players = new Array(2);
        this.winner;
        this.roundsCounter = 0;
        this.extraThrow = false;

        this.heroes = [];
        this.houses = [];

        this.traps = [];

        // holders for images
        this.logo = new Image();
        this.backgroundImage = new Image();
    }
    
}

class House {

    constructor (name, heroObject, sigilImageURL, element) {
        this.name = name;
        this.hero = heroObject;
        this.sigilURL = sigilImageURL;
        this.element;
    }
}

class Player {

    constructor(houseNum, playerNum) {
        this.house = newGame.houses[houseNum];
        this.houseNumber = houseNum;
        this.playerNum = playerNum;
        this.playerElement;
        this.currentDot = 0;
        this.x = 1380;
        this.y = 2500;
        
    }
}

class Trap {
    constructor(message, numMoves) {
        this.message = message; // text that flashes
        this.numMoves = numMoves;  // number of moves the player must move back
    }
}

