'use strict';
/* CLASSES JavaScript File */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function Game() {
    _classCallCheck(this, Game);

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
};

var House = function House(name, heroObject, sigilImageURL, element) {
    _classCallCheck(this, House);

    this.name = name;
    this.hero = heroObject;
    this.sigilURL = sigilImageURL;
    this.element;
};

var Player = function Player(houseNum, playerNum) {
    _classCallCheck(this, Player);

    this.house = newGame.houses[houseNum];
    this.houseNumber = houseNum;
    this.playerNum = playerNum;
    this.playerElement;
    this.currentDot = 0;
    this.x = 1380;
    this.y = 2500;
};

var Trap = function Trap(message, numMoves) {
    _classCallCheck(this, Trap);

    this.message = message; // text that flashes
    this.numMoves = numMoves; // number of moves the player must move back
};
