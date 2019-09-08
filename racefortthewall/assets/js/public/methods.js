"use strict";

/* METHODS JavaScript File */

var webserverRoot = "/noroff/racetothewall";

// holders for player sigils
newGame.sigilImage1 = new Image();
newGame.sigilImage2 = new Image();

// function for getting JSON from API
async function getJSON(request) {
    var response = await fetch(request);
    var data = await response.json();
    return data;
}

// Set up Canvas, paint background and scroll to bottom
var createCanvas = function createCanvas() {

    if (newGame.gameCanvas.getContext) {
        newGame.canvasContext = newGame.gameCanvas.getContext("2d");

        // Load background image for size
        newGame.backgroundImage.src = webserverRoot + "/assets/images/page02_map.jpg";

        // Make sure the image is loaded first otherwise nothing will draw.
        newGame.backgroundImage.onload = function () {
            // Set size to window size
            canvasWidth = newGame.gameCanvas.width = newGame.backgroundImage.width;
            canvasHeight = newGame.gameCanvas.height = newGame.backgroundImage.height;

            var x = newGame.gameCanvas.width / 2;
            var y = newGame.gameCanvas.height / 2;

            newGame.canvasContext.drawImage(newGame.backgroundImage, 0, 0);
            window.scrollTo(0, document.body.scrollHeight);

            // set yellow dots coordinates
            newGame.yellowDots = [{ num: 1, x: 1380, y: 2500, trap: false }, { num: 2, x: 1280, y: 2500, trap: false }, { num: 3, x: 1180, y: 2490, trap: false }, { num: 4, x: 1080, y: 2470, trap: false }, { num: 5, x: 1000, y: 2420, trap: false }, { num: 6, x: 980, y: 2320, trap: false }, { num: 7, x: 1020, y: 2230, trap: false }, { num: 8, x: 1110, y: 2190, trap: false }, { num: 9, x: 1200, y: 2160, trap: false }, { num: 10, x: 1190, y: 2080, trap: false }, { num: 11, x: 1130, y: 2020, trap: false }, { num: 12, x: 1070, y: 1950, trap: false }, { num: 13, x: 1000, y: 1900, trap: false }, { num: 14, x: 900, y: 1900, trap: false }, { num: 15, x: 800, y: 1900, trap: false }, { num: 16, x: 720, y: 1860, trap: false }, { num: 17, x: 700, y: 1780, trap: false }, { num: 18, x: 710, y: 1700, trap: false }, { num: 19, x: 790, y: 1670, trap: false }, { num: 20, x: 870, y: 1630, trap: false }, { num: 21, x: 910, y: 1540, trap: false }, { num: 22, x: 910, y: 1440, trap: false }, { num: 23, x: 940, y: 1320, trap: false }, { num: 24, x: 960, y: 1200, trap: false }, { num: 25, x: 1000, y: 1110, trap: false }, { num: 26, x: 1000, y: 1000, trap: false }, { num: 27, x: 1010, y: 900, trap: false }, { num: 28, x: 1000, y: 800, trap: false }, { num: 29, x: 1000, y: 700, trap: false }, { num: 30, x: 1000, y: 600, trap: false }];
        };
    } else {
        alert('Your browser doesnt support HTML canvas please upgrade it');
    }
};

// Updates the canvas with background, dots and players
var updateCanvas = function updateCanvas() {

    newGame.canvasContext.drawImage(newGame.backgroundImage, 0, 0);

    // start dot
    newGame.drawDot("#689e58", "#faf3e9", 1380, 2500, 30, 0);
    newGame.drawDot("#689e58", "#faf3e9", 1380, 2500, 10, 0);

    // draw all the yellow dots from list
    for (var i = 0; i < newGame.yellowDots.length; i++) {
        newGame.drawDot("#ab3f30", "#faf3e9", newGame.yellowDots[i].x, newGame.yellowDots[i].y, 20, newGame.yellowDots[i].num);
    }

    // end dot
    newGame.drawDot("#7c1634", "#faf3e9", 1000, 600, 30, 30);
    newGame.drawDot("#7c1634", "#faf3e9", 1000, 600, 10, 30);

    newGame.sigilImage1.src = newGame.players[0].house.sigilURL;
    newGame.sigilImage2.src = newGame.players[1].house.sigilURL;

    // draw player 1 sigil
    newGame.canvasContext.drawImage(newGame.sigilImage1, newGame.players[0].x - 35, newGame.players[0].y - 35, 70, 70);

    // draw player 2 sigil
    newGame.canvasContext.drawImage(newGame.sigilImage2, newGame.players[1].x - 45, newGame.players[1].y - 45, 70, 70);
};

// Draw one dot at x,y on the canvas
var drawDot = function drawDot(color, strokeColor, x, y, radius, num) {

    newGame.canvasContext.beginPath();
    newGame.canvasContext.arc(x, y, radius, 0, 2 * Math.PI, false);
    newGame.canvasContext.fillStyle = color;
    newGame.canvasContext.fill();

    newGame.canvasContext.lineWidth = 6;
    newGame.canvasContext.strokeStyle = strokeColor;
    newGame.canvasContext.stroke();

    newGame.canvasContext.font = "18px Futura";
    newGame.canvasContext.fillStyle = "#faf3e9";

    if (num !== 0 && num !== 30) {
        if (num < 10) {
            newGame.canvasContext.fillText(num, x - 5, y + 7);
        } else {
            newGame.canvasContext.fillText(num, x - 11.5, y + 7);
        }
    }
};

// Show additional information about the house
var renderAddInfo = function renderAddInfo(sel, houseNumber) {

    // remove previous content
    var addInfoDiv = document.getElementById("additional_house_info");
    while (addInfoDiv.firstChild) {
        addInfoDiv.removeChild(addInfoDiv.firstChild);
    }

    // div.sigil
    var divSigil = document.createElement('div');
    divSigil.className = "sigil";
    addInfoDiv.append(divSigil);

    // img sigil 
    var sigilImage = document.createElement('img');
    sigilImage.src = newGame.houses[houseNumber].sigilURL;
    sigilImage.alt = "Sigil of " + newGame.houses[houseNumber].name;
    divSigil.append(sigilImage);

    // h2
    var houseName = document.createElement('h2');
    houseName.innerHTML = "HOUSE " + newGame.houses[houseNumber].name;
    houseName.className = "house_name";
    addInfoDiv.append(houseName);

    // div.info
    var divInfo = document.createElement('div');
    divInfo.className = "info";
    addInfoDiv.append(divInfo);

    // div.infoline name
    var divInfoLineName = document.createElement('div');
    divInfoLineName.className = "infoline";
    divInfoLineName.innerHTML = "<span>Hero: </span> " + newGame.houses[houseNumber].hero.name;
    divInfo.append(divInfoLineName);

    // div.infoline gender
    var divInfoLineGender = document.createElement('div');
    divInfoLineGender.className = "infoline";
    divInfoLineGender.innerHTML = "<span>Gender: </span> " + newGame.houses[houseNumber].hero.gender;
    divInfo.append(divInfoLineGender);

    // div.infoline culture
    var divInfoLineCulture = document.createElement('div');
    divInfoLineCulture.className = "infoline";
    divInfoLineCulture.innerHTML = "<span>Culture: </span> " + newGame.houses[houseNumber].hero.culture;
    divInfo.append(divInfoLineCulture);

    addInfoDiv.style.display = "block";

    if (isEven(houseNumber)) {

        addInfoDiv.style.left = '29%';
    } else {

        addInfoDiv.style.left = '53%';
    }
    addInfoDiv.style.top = 50 * houseNumber + "px";
};

// Set current player 
var setPlayer = function setPlayer(sel, houseNumber) {

    // if no players selected
    if (!newGame.players[0] && !newGame.players[1]) {

        newGame.currentPlayer = 0;
        newGame.players[0] = new Player(houseNumber, 0);

        sel.style.backgroundImage = "url('" + webserverRoot + "/assets/images/house_background_green.png')";
        document.getElementById('clearButton').disabled = false;
    } else
        // check if player on is set
        if (newGame.players[0] && !newGame.players[1]) {

            //  and if house is not already choosen
            if (houseNumber !== newGame.players[0].houseNumber) {
                newGame.currentPlayer = 0;
                newGame.players[1] = new Player(houseNumber, 1);

                sel.style.backgroundImage = "url('" + webserverRoot + "/assets/images/house_background_purple.png')";
                document.getElementById('playButton').disabled = false;
                document.getElementById('playButton').style.backgroundColor = "#7c1632";
                document.getElementById('playButton').style.color = "#faf3e9";
            }
        }
};

// one round for one player
var playRound = function playRound() {

    var extraRoll = false;
    updateCanvas();
    newGame.setupPlayer();

    var diceResult = newGame.rollDice();

    if (diceResult === 6) {
        extraRoll = true;
    }

    // show dice animation
    newGame.startDice();

    setTimeout(function () {
        // show dice result 
        newGame.showDice(diceResult);
        // -1 because of start dot
        newGame.startDot = newGame.players[newGame.currentPlayer].currentDot - 1;

        // move the player to the right dot
        newGame.movePlayer(diceResult);

        // If extra roll set round to -1
        if (extraRoll) {
            newGame.flashMessage("BONUS ROLL!");
            newGame.extraThrow = true;
            newGame.roundsCounter -= 1;
        }
    }, 1200);
};

// roll a six sided dice and return the result
var rollDice = function rollDice() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    newGame.startDice();
    return randomNumber;
};

// move player to next to then it calls it selv recursivly untíl til player reaches its desitination
var movePlayer = function movePlayer(diceRoll) {

    var x = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].x;
    var y = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].y;

    // modifier that changes the movement to backwards if diceRoll is negative
    var negativeModifier = 1;
    if (diceRoll <= 0) {
        negativeModifier = -1;
    }

    // next dot
    var dstX = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot + 1 * negativeModifier].x;
    var dstY = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot + 1 * negativeModifier].y;

    // check which direction the player is moving from one dot to another

    var xDirection;
    var yDirection;

    if (x > dstX) {
        xDirection = 'left';
    } else {
        xDirection = 'right';
    }
    if (y > dstY) {
        yDirection = 'up';
    } else {
        yDirection = 'down';
    }

    // loop until player reaches the next dot
    var moveLoop = setInterval(function () {

        if (xDirection === 'left') {
            if (x > dstX) {
                x -= 1;
            }
        }

        if (xDirection === 'right') {
            if (x < dstX) {
                x += 1;
            }
        }

        if (yDirection === 'up') {
            if (y > dstY) {
                y -= 1;
            }
        }

        if (yDirection === 'down') {
            if (y < dstY) {
                y += 1;
            }
        }

        // set new coordinates for player sigil and update canvas 
        newGame.players[newGame.currentPlayer].x = x;
        newGame.players[newGame.currentPlayer].y = y;

        updateCanvas();

        // check if player has reached the next dot
        if (x === dstX && y === dstY) {
            // check if player has reached goal
            if (newGame.players[newGame.currentPlayer].currentDot === 28) {
                // Fire goal event
                window.dispatchEvent(reachGoalEvent);
            }
            // set new currentDot
            newGame.players[newGame.currentPlayer].currentDot = newGame.players[newGame.currentPlayer].currentDot + 1 * negativeModifier;
            // exit loop
            clearInterval(moveLoop);

            switch (diceRoll) {
                // fire trap event if the dot has trap
                case 1:
                    if (newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot - 1 * negativeModifier].trap) {
                        // Fire trap event
                        window.dispatchEvent(trapEvent);

                        // go to next player if no trap
                    } else {

                        newGame.roundsCounter += 1;

                        newGame.currentPlayer = mod(newGame.roundsCounter, 2);
                        document.getElementById('diceButton').disabled = false;

                        newGame.setupPlayer();
                        document.getElementById('playerBox').className = "dice animated heartBeat 1s";
                        setTimeout(function () {
                            document.getElementById('playerBox').className = "dice";
                        }, 500);
                        newGame.setupPlayer();
                        document.getElementById('playerBox').className = "dice animated pulse 3s";
                        setTimeout(function () {
                            document.getElementById('playerBox').className = "dice";
                        }, 500);

                        newGame.updateCanvas();
                    }
                    break;
                // the player  is moving backwards and has reach its destination
                case -1:
                    newGame.roundsCounter += 1;

                    newGame.currentPlayer = mod(newGame.roundsCounter, 2);
                    document.getElementById('diceButton').disabled = false;
                    newGame.setupPlayer();
                    document.getElementById('playerBox').className = "dice animated shaje 1s";
                    setTimeout(function () {
                        document.getElementById('playerBox').className = "dice";
                    }, 500);
                    newGame.setupPlayer();
                    document.getElementById('playerBox').className = "dice animated pulse 3s";
                    setTimeout(function () {
                        document.getElementById('playerBox').className = "dice";
                    }, 500);

                    newGame.updateCanvas();

                    break;
                // next player
                default:

                    // if trying to move back before start or after finish
                    if (diceRoll <= -1 && newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].num === 1 || diceRoll <= 1 && newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].num === 29) {

                        newGame.roundsCounter += 1;

                        newGame.currentPlayer = mod(newGame.roundsCounter, 2);
                        document.getElementById('diceButton').disabled = false;

                        newGame.setupPlayer();
                        document.getElementById('playerBox').className = "dice animated pulse 3s";
                        setTimeout(function () {
                            document.getElementById('playerBox').className = "dice";
                        }, 500);

                        updateCanvas();

                        // move to next dot 
                    } else {

                        // recursive until on right dot
                        if (diceRoll > 0) {
                            newGame.movePlayer(diceRoll - 1);
                        } else {
                            newGame.movePlayer(diceRoll + 1);
                        }
                    }
            }
        }
    }, 3); // player speed on on board in ms
};

// flashes current round
var flashRound = function flashRound() {

    var roundBanner = document.getElementById('currentRound');
    roundBanner.innerHTML = "ROUND #" + Math.floor(newGame.roundsCounter / 2 + 1);
    roundBanner.style.opacity = 100;
    roundBanner.className = 'round animated flipInY';

    setTimeout(function () {
        roundBanner.className = 'animated flipOutY';
    }, 1500);
};

// flashes custom message 
var flashMessage = function flashMessage(msg) {

    var flashBanner = document.getElementById('flashBanner');
    flashBanner.innerHTML = msg;
    flashBanner.style.opacity = 100;
    flashBanner.className = 'flashBanner flipInX animated';

    setTimeout(function () {
        flashBanner.className = 'animated flipOutX';
    }, 1500);
};

// flashes trap
var flashTrapMessage = function flashTrapMessage() {

    var trapImage = new Image();

    trapImage.src = webserverRoot + '/assets/images/trap_image.png';
    trapImage.alt = "It's a trap!";
    var trapImage_x = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].x;
    var trapImage_y = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot].y;

    newGame.canvasContext.drawImage(trapImage, trapImage_x - 200, trapImage_y - 200, trapImage.width / 2, trapImage.height / 2);

    newGame.canvasContext.font = '2.5rem FuturaCondencedBold,"Trebuchet MS", Arial, sans-serif';
    newGame.canvasContext.strokeStyle = 'black';
    newGame.canvasContext.lineWidth = 8;

    console.log("currentDot: " + newGame.players[newGame.currentPlayer].currentDot);
    console.log("message: " + newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot - 1].trap);

    wrapText(newGame.canvasContext, newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot - 1].trap.message, trapImage_x + 200, trapImage_y - 200, 300, 60);

    setTimeout(function () {
        trapBox.className = 'trap animated fadeOut';
    }, 4000);
};

// build player and dice field
var setupPlayer = function setupPlayer() {

    var playerBoxDiv = document.getElementById('playerBox');
    playerBoxDiv.innerHTML = "";

    var sigilDiv = document.createElement('div');
    sigilDiv.className = 'sigil';
    playerBoxDiv.append(sigilDiv);

    var sigilImage = document.createElement('img');
    sigilImage.src = newGame.players[newGame.currentPlayer].house.sigilURL;
    sigilImage.alt = "Sigil " + newGame.players[newGame.currentPlayer].house.name;;
    sigilDiv.append(sigilImage);

    var playerNumDiv = document.createElement('div');
    playerNumDiv.className = 'num';
    playerNumDiv.innerHTML = "Player #" + (newGame.currentPlayer + 1);
    playerBoxDiv.append(playerNumDiv);

    var playerHeroDiv = document.createElement('div');
    playerHeroDiv.className = 'hero';
    playerHeroDiv.innerHTML = newGame.players[newGame.currentPlayer].house.hero.name;
    playerBoxDiv.append(playerHeroDiv);

    var imageDiv = document.createElement('div');
    imageDiv.className = 'image';
    playerBoxDiv.append(imageDiv);

    var diceImage = document.createElement('img');
    diceImage.src = webserverRoot + '/assets/images/dice.png';
    diceImage.alt = "Dice";
    diceImage.id = "diceImage";
    imageDiv.append(diceImage);

    var rollButton = document.createElement('button');
    rollButton.className = 'dice';
    rollButton.id = 'diceButton';
    rollButton.innerHTML = "ROLL THE DICE!";
    playerBoxDiv.append(rollButton);

    rollButton.addEventListener('click', function (e) {

        // start roll on click
        if (!newGame.winner) {
            newGame.sigilImage1.src = newGame.players[0].house.sigilURL;
            newGame.sigilImage1.id = "player1_image";
            newGame.sigilImage2.src = newGame.players[1].house.sigilURL;
            newGame.sigilImage1.id = "player2_image";

            if (newGame.currentPlayer === 0 && !newGame.extraThrow) {
                newGame.flashRound();
            }

            playRound();
        }
    });
};

// start dice animation
var startDice = function startDice() {
    document.getElementById('diceImage').src = webserverRoot + '/assets/images/dice.png';
    document.getElementById('diceImage').style.animation = 'rotation 0.2s infinite linear';
};

// stop dice animation
var stopDice = function stopDice(value) {
    document.getElementById('diceImage').style.animation = none;
};

// show dice result
var showDice = function showDice(value) {
    document.getElementById('diceImage').style.animation = 'none';

    switch (value) {
        case 1:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_1.svg";
            break;
        case 2:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_2.svg";
            break;
        case 3:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_3.svg";
            break;
        case 4:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_4.svg";
            break;
        case 5:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_5.svg";
            break;
        case 6:
            document.getElementById('diceImage').src = webserverRoot + "/assets/images/dice/dice_6.svg";
            break;

    }

    document.getElementById('diceButton').disabled = true;
};

// set up 5 traps on random dots
var setupTraps = function setupTraps() {
    var randomDot;

    for (var i = 0; i < newGame.traps.length; i++) {
        // place traps on 5 random dots
        randomDot = Math.floor(Math.random() * 28) + 1;

        if (!newGame.yellowDots[randomDot].trap) {
            newGame.yellowDots[randomDot].trap = newGame.traps[i];
        } else {
            // dot already has trap. set new dot
            randomDot = Math.floor(Math.random() * 30);
            newGame.yellowDots[randomDot].trap = newGame.traps[i];
        }
    }
    console.log(newGame.yellowDots);
};

// send player back x dots when trapped
var trapExecute = function trapExecute(numSpaces) {

    var numStepsBack = newGame.yellowDots[newGame.players[newGame.currentPlayer].currentDot - 1].trap.numMoves;
    newGame.movePlayer(numStepsBack);
};

// load hero data from GoT API
var loadHeroes = function loadHeroes() {
    var corsProxy = "";

    // get data on all 10 heroes  (with cors proxy locally)
    var results = getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Arya Stark').then(function (data) {
        newGame.heroes[0] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Daenerys Targaryen');
    }).then(function (data) {
        newGame.heroes[1] = data[1];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Theon Greyjoy');
    }).then(function (data) {
        newGame.heroes[2] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Stannis Baratheon');
    }).then(function (data) {
        newGame.heroes[3] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Tyrion Lannister');
    }).then(function (data) {
        newGame.heroes[4] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Doran Martell');
    }).then(function (data) {
        newGame.heroes[5] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Margaery Tyrell');
    }).then(function (data) {
        newGame.heroes[6] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Lothar Frey');
    }).then(function (data) {
        newGame.heroes[7] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Jon Arryn');
    }).then(function (data) {
        newGame.heroes[8] = data[0];
    }).then(function (data) {
        return getJSON(corsProxy + 'https://anapioficeandfire.com/api/characters?Name=Edmure Tully');
    }).then(function (data) {
        newGame.heroes[9] = data[0];
    }).then(function () {
        newGame.createHouses();
        newGame.populateHouses();

        /* Add event listeners for additional hero information */
        var allHouses = document.getElementsByClassName('house');

        /* setting up events for additional house info */
        for (var i = 0; i < allHouses.length; i++) {

            allHouses[i].addEventListener('mouseenter', function (i) {
                newGame.renderAddInfo(allHouses[i], i);
            }.bind(allHouses[i], i));

            allHouses[i].addEventListener('click', function (i) {
                newGame.setPlayer(allHouses[i], i);
            }.bind(allHouses[i], i));

            allHouses[i].addEventListener('mouseleave', function () {

                var addInfoDiv = document.getElementById('additional_house_info');
                addInfoDiv.style.display = 'none';
            });
        }
    });
};

// set up House objects and include JSON data
var createHouses = function createHouses(callback) {
    newGame.houses[0] = new House("Stark", newGame.heroes[0], webserverRoot + "/assets/images/sigils/sigil_stark.png");
    newGame.houses[1] = new House("Targaryen", newGame.heroes[1], webserverRoot + "/assets/images/sigils/sigil_targaryen.png");
    newGame.houses[2] = new House("Greyjoy", newGame.heroes[2], webserverRoot + "/assets/images/sigils/sigil_greyjoy.png");
    newGame.houses[3] = new House("Baratheon", newGame.heroes[3], webserverRoot + "/assets/images/sigils/sigil_baratheon.png");
    newGame.houses[4] = new House("Lannister", newGame.heroes[4], webserverRoot + "/assets/images/sigils/sigil_lannister.png");
    newGame.houses[5] = new House("Martell", newGame.heroes[5], webserverRoot + "/assets/images/sigils/sigil_martell.png");
    newGame.houses[6] = new House("Tyrell", newGame.heroes[6], webserverRoot + "/assets/images/sigils/sigil_tyrell.png");
    newGame.houses[7] = new House("Frey", newGame.heroes[7], webserverRoot + "/assets/images/sigils/sigil_frey.png");
    newGame.houses[8] = new House("Arryn", newGame.heroes[8], webserverRoot + "/assets/images/sigils/sigil_arryn.png");
    newGame.houses[9] = new House("Tully", newGame.heroes[9], webserverRoot + "/assets/images/sigils/sigil_tully.png");
};

// set up character select screen
var populateHouses = function populateHouses() {

    var housesContainer = document.getElementById('housesContainer');

    for (var i = 0; i < newGame.houses.length; i++) {
        // div.house
        var houseDiv = document.createElement('div');
        houseDiv.className = "house";
        housesContainer.append(houseDiv);

        // assign house HTML element
        newGame.houses[i].element = houseDiv;

        // div.left
        var leftDiv = document.createElement('div');
        leftDiv.className = "left";
        houseDiv.append(leftDiv);

        // img sigil 
        var sigilImage = document.createElement('img');
        sigilImage.src = newGame.houses[i].sigilURL;
        sigilImage.alt = "Sigil " + newGame.houses[i].name;
        leftDiv.append(sigilImage);

        // div.right
        var rightDiv = document.createElement('div');
        rightDiv.className = "right";
        houseDiv.append(rightDiv);

        // h2
        var houseName = document.createElement('h2');
        houseName.innerHTML = "HOUSE " + newGame.houses[i].name;
        rightDiv.append(houseName);

        // div.hero
        var heroDiv = document.createElement('div');
        heroDiv.className = "hero";
        heroDiv.innerHTML = "<span>Hero: </span>" + newGame.houses[i].hero.name;
        rightDiv.append(heroDiv);
    }
};

// set up trap objects 
var loadTraps = function loadTraps() {
    newGame.traps[0] = new Trap("You have been burned by Daenerys' dragons. Find water! Move back 7 tiles.", -7);
    newGame.traps[1] = new Trap("Cersei Lannisters spys have spotted you! Careful now. Move back 3 tiles.", -3);
    newGame.traps[2] = new Trap("The Night King is gazing at you from afar! You hide in fear. Move back 2 tiles.", -2);
    newGame.traps[3] = new Trap("Euron Greyjoy kidnapped your knights. Seek cover! Move back 6 tiles.", -6);
    newGame.traps[4] = new Trap("Ramsey Bolton wants to torture you. Run away! Move back 10 tiles.", -10);
};

// set up score page with winner and looser
var scoreTime = function scoreTime() {

    document.getElementById("page02").style.display = 'none';
    document.getElementById("page03").style.display = 'block';

    // winner
    var winnerHouse = document.getElementById('winnerHouse');

    var sigilElement = document.createElement('img');
    sigilElement.src = newGame.players[newGame.winner].house.sigilURL;
    sigilElement.alt = "Sigil of House " + newGame.players[newGame.winner].house.name;
    winnerHouse.append(sigilElement);

    var houseElement = document.createElement('div');
    houseElement.className = "house_name";
    houseElement.innerHTML = "HOUSE " + newGame.players[newGame.winner].house.name;
    winnerHouse.append(houseElement);

    // looser

    var looserHouse = document.getElementById('looserHouse');

    sigilElement = document.createElement('img');
    sigilElement.src = newGame.players[newGame.looser].house.sigilURL;
    sigilElement.alt = "Sigil of House " + newGame.players[newGame.looser].house.name;
    looserHouse.append(sigilElement);

    houseElement = document.createElement('div');
    houseElement.className = "house_name";
    houseElement.innerHTML = "HOUSE " + newGame.players[newGame.looser].house.name;
    looserHouse.append(houseElement);

    var winnerElement = document.getElementById('winnerElement');
    var looserElement = document.getElementById('looserElement');

    // simple animation
    winnerElement.className = "player animated flipInX";
    setTimeout(function () {
        looserElement.className = "player animated flipInY";
    }, 1000);

    document.getElementById('winnerHouseEnd').innerHTML = newGame.players[newGame.winner].house.name;
};

/* class methods */
Game.prototype.createCanvas = createCanvas;
Game.prototype.updateCanvas = updateCanvas;
Game.prototype.setupTraps = setupTraps;
Game.prototype.trapExecute = trapExecute;
Game.prototype.drawDot = drawDot;
Game.prototype.renderAddInfo = renderAddInfo;
Game.prototype.setPlayer = setPlayer;
Game.prototype.setupPlayer = setupPlayer;
Game.prototype.playRound = playRound;
Game.prototype.rollDice = rollDice;
Game.prototype.movePlayer = movePlayer;
Game.prototype.flashRound = flashRound;
Game.prototype.flashMessage = flashMessage;
Game.prototype.flashTrapMessage = flashTrapMessage;
Game.prototype.startDice = startDice;
Game.prototype.stopDice = stopDice;
Game.prototype.showDice = showDice;
Game.prototype.loadHeroes = loadHeroes;
Game.prototype.createHouses = createHouses;
Game.prototype.populateHouses = populateHouses;
Game.prototype.loadTraps = loadTraps;
Game.prototype.scoreTime = scoreTime;
