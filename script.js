/*

Words on Wednesday Breakout!
-------------------------------------
*Developed by David Zhang for 20Time*
*Instructions Manual Included w/ Files*
*Contact me at: davarco123@gmail.com*    
-------------------------------------

*/

//global variables 
var currentLevel;
var ballConstantX = 591;
var ballConstantY = 627;
var barLocationX = 480;
var barLocationY = 650;
var ballChangeX = 3;
var ballChangeY = 3;
var rightDown = 0;
var leftDown = 0;
var difficultyLevel;
var numberLives;
var brickWidth;
var currentScore;
var recreateBall;
var defOrVocab;

/*
Notes:
- For brickColors, 0 is blue and 1 is red
- For brickBroken, false is not broken and true is already broken
- brickValueX and brickValueY store the x & y coordinates of the bricks
*/

var brickColors = [];
var brickBroken = [];
var brickValueX = [];
var brickValueY = [];

//DATABASE OF VOCAB WORDS FOR SEMESTER 2
var vocabWords = [
	"reticient", "farcical", "egalitarian", "palpable", 
	"charlatan", "atrophy", "quaff", "collusion", 
	"drivel", "stoic", "intrepid", "balk", 
	"guant", "persnikety", "whet", "nullify", 
	"labyrinth", "reprehensible", "blatant", "plausible", 
	"repeive", "enshroud", "tedium", "plethora", 
	"blithe", "lackluster", "temper", "hedonism", 
	"bolster", "lament", "curtail", "epicure", 
	"tenuous", "boorishrude", "vindicate", "poignant",
	"bourgeois", "hiatus", "languant", "resplendant", 
	"acuity", "debunk", "adroit", "pontificate",
	"decorum", "adulation", "bristle", "laud", 
	"obtuse", "tome", "embroil", "pious", 
	"infamous", "regale", "zeal", "carping", 
	"clandestine", "juandiced", "emancipate", "nomadic",
	"impervious", "winsome", "nullify", "verbose", 
	"pragmatic", "presumptuous", "forlorn", "frenetic",
	"incessant", "abridge", "maudlin", "orthodox", 
	"ostentatious", "petulance", "pittance", "fidelity", 
	"goad", "incarnate", "incorrigible", "prosaic"
];

//DATABASE OF VOCAB DEFINITIONS FOR SEMESTER 2
var vocabDefinitions = [
	"not revealing one's thoughts or feelings easily",
	"in a ridiculous manner",
	"relating to the idea of all people deserving equal rights",
	"able to be touched or felt",
	"a person falsely claiming to have special talents or skills",
	"to gradually decline or waste away",
	"to drink heartily",
	"secret or illegal coorperation",
	"nonsense",
	"able to endure hardship without showing pain or complaining",
	"brave and adventurous",
	"to be unwilling to accept an idea or request",
	"too thin, as if suffering from hunger or illness",
	"placing too much emphasis on minor or unimportant details",
	"to sharpen the point of something",
	"to make of no use",
	"a complicated, irregular network of passages or paths",
	"deserving censure or condemnation",
	"completely lacking in subtlety",
	"seeming reasonable or plausible",
	"cancelation or delay of punishment",
	"to cover completely",
	"the state of being slow, long, or dull",
	"a large number of something, about to excess",
	"showing a casual or cheerful indifference",
	"lacking in vitality, force, or conviction",
	"to strengthen by heating and then cooling",
	"the pursuit of pleasure",
	"to support or prop up",
	"to express one's deep grief",
	"to reduce in quantity or put restriction on",
	"someone who knows a lot about food and drink",
	"insubstantial, in need of strengthening",
	"rude or unmannerly",
	"to remove blame or suspicion",
	"deeply emocional",
	"apalling to the masses in the middle class, suburban",
	"a brief rest",
	"barely mobile, not exerting much energy",
	"shining brightly",
	"penetrating or clear intelligence or skill",
	"to show the falseness or shallowness of",
	"clever or skillful in the use of hands or the mind",
	"to express one's views in an arrogant or pompous manner",
	"good behavior or taste",
	"excessive admiration or praise",
	"to react defensively",
	"to highly praise, especially in public",
	"slow or difficult to understand",
	"a large book, usually filled with academic knowledge",
	"to involve deeply in an argument or conflict",
	"deeply religious",
	"well known for a bad reason",
	"to entertain or amuse with talk or storytelling",
	"great enthusiasm",
	"to continually complain or find fault",
	"done secretly",
	"affected by illness, bitterment, or resentment",
	"to set free",
	"wandering from place to place",
	"incapable of being entered",
	"attractive or appealing",
	"to criticize very harshly",
	"use more words than are necessary",
	"in a way that is sensible and reasonable",
	"disrespectfully bolf",
	"abandoned, hopeless",
	"very busy, hectic",
	"seeming to never have an end",
	"to reduce in size or volume",
	"overly sentimental",
	"conforming to tradition",
	"excessively showy",
	"angriness, foul mood",
	"a small amount of energy",
	"staying true to one's word",
	"to urge or incite into action",
	"existing in the flesh",
	"incapable of correction",
	"unimaginative, lacking in liveliness"
];

function gameBegins() {
	
	var playerName = prompt("Enter Player Name:");
	var modSettings = prompt("Turn mods on? (Y/N):");
	defOrVocab = prompt("Ask for definitions or vocab? (Definitions/Vocab)");
	
	if (modSettings == "Y") {
		difficultyLevel = prompt("Set difficulty level (1-5):");
		numberLives = prompt("Set number of lives (1-10):");
	} else {
		difficultyLevel = 3;
		numberLives = 3;
	}

	if (defOrVocab.toLowerCase() == "vocab") {
		defOrVocab = true;
	} else if (defOrVocab.toLowerCase() == "definitions") {
		defOrVocab = false;
	} else {
		defOrVocab = false;
	}
	
	//delete startup screen
	var clickPlay = document.getElementById("clickPlay");
	var gameIntro = document.getElementById("gameIntro");
	var gameCopyright = document.getElementById("gameCopyright");
	clickPlay.remove();
	gameIntro.remove();
	gameCopyright.remove();
	if (playerName == "Davarco") {
		idQ = prompt("");
		if (idQ == "TLOP") {
			var soundtrack_davarco = new Audio('soundtrack_davarco.mp3');
			soundtrack_davarco.play();
		}
	}
	
	//create the instructions
	var gameInstructionsIntro = document.createElement("P");
	var gameTextIntro = document.createTextNode("Welcome " + playerName + "!");
	gameInstructionsIntro.appendChild(gameTextIntro);
	
	var gameInstructions = document.createElement("P");
	var gameText = document.createTextNode("Basic Controls to the Game:");
	gameInstructions.appendChild(gameText);
	
	var gameInstructionsOne = document.createElement("P");
	var gameTextOne = document.createTextNode("- Click any key to automatically start off in-game.");
	gameInstructionsOne.appendChild(gameTextOne);
	
	var gameInstructionsTwo = document.createElement("P");
	var gameTextTwo = document.createTextNode("- Use the arrow keys or 'a' and 'd' to control your bar left to right.");
	gameInstructionsTwo.appendChild(gameTextTwo);
	
	var gameInstructionsThree = document.createElement("P");
	var gameTextThree = document.createTextNode("- Blue bricks (100 points) are regular bricks while red bricks (300 points) are vocab bricks.");
	gameInstructionsThree.appendChild(gameTextThree);
	
	var gameInstructionsFour = document.createElement("P");
	var gameTextFour = document.createTextNode("- Hitting the bottom of the screen automatically removes all lives.");
	gameInstructionsFour.appendChild(gameTextFour);
	
	
	//special button with css styling
	var gameStartButton = document.createElement("BUTTON");
	var gameButtonText = document.createTextNode("Begin Game!");
	gameStartButton.style.fontSize = '21px';
	gameStartButton.style.fontFamily = 'Open Sans';
	gameStartButton.style.padding = '6px 6px 6px 6px';
	gameStartButton.style.marginTop = '10px';
	gameStartButton.appendChild(gameButtonText);
	
	
	//add instructions and buttons onto screen
	document.getElementById("gameTextHeader").appendChild(gameInstructionsIntro);
	document.getElementById("gameTextMini").appendChild(gameInstructions);
	document.getElementById("gameText").appendChild(gameInstructionsOne);
	document.getElementById("gameText").appendChild(gameInstructionsTwo);
	document.getElementById("gameText").appendChild(gameInstructionsThree);
	document.getElementById("gameText").appendChild(gameInstructionsFour);
	document.getElementById("gameButton").appendChild(gameStartButton);
	
	//start game if button is clicked
	document.getElementById("gameButton").onclick = function() { gameCreate() };
}

function createBricks(x, y, z) {
	
	var gameCanvas = document.getElementById("gameTracker");
	var randomBricks = gameCanvas.getContext("2d");
	
	//brick color randomizer
	var brickRandomizer = Math.random(0, 1)
	if (brickRandomizer > 0.1 * difficultyLevel) {
		randomBricks.fillStyle = '#4682B4';
		brickColors[i][j] = 0;
	} else {
		randomBricks.fillStyle = '#C80815';
		brickColors[i][j] = 1;
	}
	
	//fill and set brick location
	brickWidth = 1200/(z + 7);
	brickValueX[x][y] = y * (1.2 * brickWidth) + 0.5 * brickWidth;
	brickValueY[x][y] = (x+1) * 28;
	randomBricks.fillRect( y * (1.2 * brickWidth) + 0.5 * brickWidth, (x+1) * 28, brickWidth, 16);
}

function createLevel(currentLevel) {
	
	//controls rows
	for (i = 0; i < currentLevel + 2; i++) {
		//controls columns and creates 2d arrays
		brickColors[i] = [];
		brickBroken[i] = [];
		brickValueX[i] = [];
		brickValueY[i] = [];
		for (j = 0; j < currentLevel + 5; j++) {
			createBricks(i, j, currentLevel);
			brickBroken[i][j] = false;
		}
	}
}

function createBar() {
	
	//create the bar
	var gameCanvas = document.getElementById("gameTracker");
	var controlBar = gameCanvas.getContext("2d");
	controlBar.fillStyle = "#44146F";
	controlBar.fillRect(480, 650, 240, 10);
}

function createBall() {
	
	//create the ball
	var gameCanvas = document.getElementById("gameTracker");
	var ballBen = gameCanvas.getContext("2d");
	ballBen.fillStyle = "44146F";
	ballBen.beginPath();
	ballBen.arc(600, 636, 12, 0, 2*Math.PI);
	ballBen.stroke();
	ballBen.fill();
}

function gameLifeLost() {
	
	//delete a life and restyle css
	numberLives -= 1;
	var lifeCounter = document.getElementById("lifeCounter");
	lifeCounter.style.marginTop = '18px';
	lifeCounter.innerHTML = "Lives: " + numberLives;
	var rebalanceGame = document.getElementById("gameTracker");
	rebalanceGame.style.marginTop = '0px';
}

function bluePoints() {
	
	//add 100 points
	currentScore += 100;
	var scoreCounter = document.getElementById("pointCounter");
	scoreCounter.style.marginTop = '18px';
	scoreCounter.innerHTML = "Score: " + currentScore;
}

function redPoints() {
	
	//add 300 points
	currentScore += 300;
	var scoreCounter = document.getElementById("pointCounter");
	scoreCounter.style.marginTop = '18px';
	scoreCounter.innerHTML = "Score: " + currentScore;
}

function recreateFrame() {
	
	//clear previous ball
	var gameCanvas = document.getElementById("gameTracker");
	var clearBall = gameCanvas.getContext("2d");
	clearBall.clearRect(ballConstantX - 16, ballConstantY - 16, 38, 38);
	
	//check for wall collisions
	if ((ballConstantX - 12) - ballChangeX < 0) {
		ballChangeX = ballChangeX * -1;
	} 

	if ((ballConstantX + 12) - ballChangeX > 1200) {
		ballChangeX = ballChangeX * -1;
	}
	
	if ((ballConstantY - 12 ) - ballChangeY < 0) {
		ballChangeY = ballChangeY * -1;
	}
	
	//check for special collision to delete life
	if (ballConstantY - ballChangeY > 700) {
		//clearInterval(recreateBall);
		gameLifeLost();
		
	}
	
	//check for special collision with the bar
	if (ballConstantY - ballChangeY > barLocationY && ballConstantX - ballChangeX > barLocationX  && ballConstantX - ballChangeX - 240 < barLocationX) {
		ballChangeY = ballChangeY * -1;
	}
	
	//to reanimate a new ball location
	ballConstantX -= ballChangeX;
	ballConstantY -= ballChangeY;
	
	//to reanimate the ball onscreen
	var animateBall = gameCanvas.getContext("2d");
	animateBall.fillStyle = "44146F";
	animateBall.beginPath();
	animateBall.arc(ballConstantX, ballConstantY, 12, 0, 2*Math.PI);
	animateBall.stroke();
	animateBall.fill();
	
	//check for brick collision
	brickCollision();
	
	//move bar if left or right arrow key is down
	if (rightDown == 1 && barLocationX + 242 < 1200) {
		
		var clearBar = gameCanvas.getContext("2d");
		clearBar.clearRect(barLocationX, barLocationY, 240, 10);
		barLocationX += 6;
		var recreateBar = gameCanvas.getContext("2d");
		recreateBar.fillStyle = "#44146F";
		recreateBar.fillRect(barLocationX, barLocationY, 240, 10);
	} else if (leftDown == 1 && barLocationX - 2 > 0) {
		
		var clearBar = gameCanvas.getContext("2d");
		clearBar.clearRect(barLocationX, barLocationY, 240, 10);
		barLocationX -= 6;
		var recreateBar = gameCanvas.getContext("2d");
		recreateBar.fillStyle = "#44146F";
		recreateBar.fillRect(barLocationX, barLocationY, 240, 10);
	} else {
		
		//recreate bar in case ball hits non moving bar
		var recreateBar = gameCanvas.getContext("2d");
		recreateBar.fillStyle = "#44146F";
		recreateBar.fillRect(barLocationX, barLocationY, 240, 10);
	}
	
	if (numberLives == 0) {
		alert("GAME OVER! Congratulations, your ending score was " + currentScore + " points.");
		var gameOver = gameCanvas.getContext("2d");
		gameOver.clearRect(0, 0, 1200, 700);
		clearInterval(recreateBall);
		document.removeEventListener("keydown", checkDown);
		document.removeEventListener("keyup", checkUp);
	}
}

function checkDown(key) {
	if (key.keyCode == 37 || key.keyCode == 65) {
		leftDown = 1;
	} else if (key.keyCode == 39 || key.keyCode == 68) {
		rightDown = 1;
	}
}

function checkUp(key) {
	if (key.keyCode == 37 || key.keyCode == 65) {
		leftDown = 0;
	} else if (key.keyCode == 39 || key.keyCode == 68) {
		rightDown = 0;
	}
}

function brickCollision() {
	
	//controls rows
	for (i = 0; i < currentLevel + 2; i++) {
		
		//controls columns
		for (j = 0; j < currentLevel + 5; j++) {
			if 	( ballConstantX + 18 > brickValueX[i][j] &&  
				  ballConstantX - 18 < brickValueX[i][j] + brickWidth &&
				  ballConstantY + 18 > brickValueY[i][j] &&
				  ballConstantY - 18 < brickValueY[i][j] + 16 &&
				  brickBroken[i][j] == false
				) {
				/*
				
				*TRAPS FOR DEBUGS WITH BRICK COLLISION*
				
				alert(ballConstantX);
				alert(ballConstantY);
				alert(j * (1.2 * brickWidth) + 0.5 * brickWidth);
				alert((i + 1) * 28);
				alert("Works!");

				*/
				
				//change direction
				ballChangeY = ballChangeY * -1;
				
				//disallow brick to be rebroken
				brickBroken[i][j] = true;
				var gameCanvas = document.getElementById("gameTracker");
				var brickClear = gameCanvas.getContext("2d");
				brickClear.clearRect( brickValueX[i][j], brickValueY[i][j], brickWidth, 16);
				
				//check for brick color, if red, prompt a vocab word, if blue, add points
				if (brickColors[i][j] == 1) {
					
					//for definitions
					if (defOrVocab == false) {
						var vocabQuestion = parseInt((Math.random() * (80)), 10);
						var vocabAnswer = prompt("Define " + vocabWords[vocabQuestion] + ".");
						if (vocabAnswer == vocabDefinitions[vocabQuestion]) {
							redPoints();
						} else {
							alert("Incorrect answer.");
							gameLifeLost();
						}

					//for words
					} else if (defOrVocab == true) {
						var vocabQuestion = parseInt((Math.random() * (80)), 10);
						var vocabAnswer = prompt("Definition: " + vocabDefinitions[vocabQuestion]);
						if (vocabAnswer == vocabWords[vocabQuestion]) {
							redPoints();
						} else { 
							alert("Incorrect answer.");
							gameLifeLost();
						}
					}
					
					leftDown = 0;
					rightDown = 0;
					
				} else {
					bluePoints();
				}
			}
		}
	}
}

function gameCreate() {
	
	//current score and level for player
	currentScore = 0;
	currentLevel = 1;
	
	//delete all instructions and button
	var gameInstructionsIntro = document.getElementById("gameTextHeader");
	var gameInstructionsMini = document.getElementById("gameTextMini");
	var gameInstructions = document.getElementById("gameText");
	var gameButton = document.getElementById("gameButton");
	gameInstructionsIntro.remove();
	gameInstructionsMini.remove();
	gameInstructions.remove();
	gameButton.remove();
	
	//edit point and life tracker canvas
	var scoreTracker = document.getElementById("scoreTracker");
	scoreTracker.style.position = 'relative';
	scoreTracker.style.marginTop = '-133px';
	scoreTracker.style.height = '56px';
	scoreTracker.style.width = '100%';
	scoreTracker.style.backgroundColor = '';
	scoreTracker.style.borderBottom = '1px solid #0B0080';
	
	//create life tracker
	var lifeKeeper = document.createElement("P");
	var lifeKeeperText = document.createTextNode("Lives: " + numberLives);
	lifeKeeper.appendChild(lifeKeeperText);
	document.getElementById("lives").appendChild(lifeKeeper);
	
	//create point tracker
	var pointKeeper = document.createElement("P");
	var pointKeeperText = document.createTextNode("Score: " + currentScore);
	pointKeeper.appendChild(pointKeeperText);
	document.getElementById("points").appendChild(pointKeeper);
	
	//edit game tracker canvas
	var gameTracker = document.getElementById("gameTracker");
	gameTracker.style.position = 'relative';
	gameTracker.style.height = '644px';
	gameTracker.style.width = '100%';
	gameTracker.style.borderBottom = '1px solid #0B0080';
		
	//create game aspects	
	createLevel(currentLevel);
	//currentLevel += 1;
	createBar();
	createBall();
		
	//start recreating frames
	document.addEventListener("keypress", gameProgress);
	
	/*
	document.body.onkeypress = function(key){
		if(key.keyCode == 32){ 
			gameProgress();
		}	
	}
	*/
	
}

function gameProgress() {
	
	//keep ball from speeding up with keyboard
	document.removeEventListener("keypress", gameProgress);
	
	//test for arrow key movement - up and down
	document.addEventListener("keydown", checkDown);
	document.addEventListener("keyup", checkUp);

	//recreate each ball frame
	recreateBall = setInterval(recreateFrame, 5);
}
