/**********************************************************************************************************
Keith Saunders Project 2 - Puzzles
**********************************************************************************************************/
/**********************************************************************************************************
Attaching to Gameport
**********************************************************************************************************/
// Attach to the HTML document via gameport ID
var gameport = document.getElementById("gameport");

/**********************************************************************************************************
Aliasing 
**********************************************************************************************************/
// Using Aliasing 
var Container = PIXI.Container,
	autoDetectRenderer = PIXI.autoDetectRenderer,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	TextureCache = PIXI.utils.TextureCache,
	Texture = PIXI.Texture,
	Sprite = PIXI.Sprite
	Text = PIXI.Text;

	
/**********************************************************************************************************
Creating the Stage and appending to Gameport
**********************************************************************************************************/	
// Creating the PIXI stage and renderer
var stage = new Container(),
	renderer = autoDetectRenderer(800, 600, {backgroundColor: 0x000000});
	
// Appying to the HTML view
gameport.appendChild(renderer.view);

/**********************************************************************************************************
Loader
**********************************************************************************************************/	
// Load a JSON file and run the setup function. 
// 'adds' the JSON sheet
loader
	.add("images/assets.json")
	//.on("progress", loadProgressHandler)
	.load(setup);
	

/***********************************************************************************************************
Var Declaration
***********************************************************************************************************/
var state;
var buttons, start, play, help, credits, back, creditBack;
var redButton, blueButton, greenButton, yellowButton;
var says = [];
var playerSays;
var playerSaid = [];
var globalCount = 0;

/**********************************************************************************************************
Setup Function
**********************************************************************************************************/
function setup(){
	/*******************************************************************************************************
	Scene Creations
	*******************************************************************************************************/
	
	// Introduction Scene
	introScene = new Container();
	stage.addChild(introScene);
	
	// Help Scene
	helpScene = new Container();
	stage.addChild(helpScene);
	helpScene.visible = false;
	
	// Credits Scene
	creditScene = new Container();
	stage.addChild(creditScene);
	creditScene.visible = false;
	
	// Game scene
	gameScene = new Container();
	stage.addChild(gameScene);
	gameScene.visible = false;
	
	// Game Over Scene
	gameOverScene = new Container();
	stage.addChild(gameOverScene);
	gameOverScene.visible = false;
	
	/*******************************************************************************************************
	Sprite Creation
	*******************************************************************************************************/
	// Creating an alias to the texture atlas
	id = PIXI.loader.resources["images/assets.json"].textures;
	
	/*******************************************************************************************************
	Introduction Scene 
	*******************************************************************************************************/
	// Add Sprite png's
	startMenu = new Sprite(id["Start Screen.png"]);
	play = new Sprite(id["Start Button.png"]);
	help = new Sprite(id["Help Button.png"]);
	credits = new Sprite(id["Credit Button.png"]);
	
	// Intro Scene Start Menu
	introScene.addChild(startMenu);
	
	// Buttons Container
	var buttons = new Container();
	buttons.position.x = 400;
	buttons.position.y = 300;
	introScene.addChild(buttons);

		// Play Button 
		buttons.addChild(play);
		play.anchor.x = 0.5;
		play.anchor.y = 0.5;
		play.scale.x = 0.7;
		play.scale.y = 0.7;
		play.position.x = 0;
		play.position.y = 0;
		play.interactive = true;
		play.on('mousedown', startHandler);
	
		// Help Button
		buttons.addChild(help);
		help.anchor.x = 0.5;
		help.anchor.y = 0.5;
		help.scale.x = 0.7;
		help.scale.y = 0.7;
		help.position.x = 0;
		help.position.y = 100;
		help.interactive = true;
		help.on('mousedown', helpHandler);
		
		// Credits Button
		buttons.addChild(credits);
	
		credits.anchor.x = 0.5;
		credits.anchor.y = 0.5;
		credits.scale.x = 0.7;
		credits.scale.y = 0.7;
		credits.position.x = 0;
		credits.position.y = 200;
		credits.interactive = true;
		credits.on('mousedown', creditHandler);
	
	/*******************************************************************************************************
	Help Scene
	*******************************************************************************************************/
	helpScene = new Container();
	stage.addChild(helpScene);
	helpScene.visible = false;
	
	helpScreen = new Sprite(id["Help Screen.png"]);
	helpScene.addChild(helpScreen);
		
		// Back Button 
		back = new Sprite(id["Back Button.png"]);
		helpScene.addChild(back);
		back.anchor.x = 0.5;
		back.anchor.y = 0.5;
		back.scale.x = 0.7;
		back.scale.y = 0.7;
		back.position.x = 400;
		back.position.y = 300;
		back.interactive = true;
		back.on('mousedown', backHandler);
	
	/*******************************************************************************************************
	Credits Scene
	*******************************************************************************************************/
	creditsScene = new Container();
	stage.addChild(creditsScene);
	creditsScene.visible = false;
	
	creditsScreen = new Sprite(id["Credits Screen.png"]);
	creditScene.addChild(creditsScreen);
	
		// Back Button
		creditBack = new Sprite(id["Back Button.png"]);
		creditsScene.addChild(creditBack);
		creditBack.anchor.x = 0.5;
		creditBack.anchor.y = 0.5;
		creditBack.scale.x = 0.7;
		creditBack.scale.y = 0.7;
		creditBack.position.x = 200;
		creditBack.position.y = 300;
		creditBack.interactive = true;
		creditBack.on('mousedown', creditBackHandler);
		
	
	/*******************************************************************************************************
	Game Scene
	*******************************************************************************************************/
	gameScene = new Container();
	stage.addChild(gameScene);
	gameScene.visible = false;
	
	// Game Screen
	gameScreen = new Sprite(id["Game Screen.png"]);	
	gameScene.addChild(gameScreen);
	
	colors = new Container()
	colors.position.x = 400;
	colors.position.y = 300;
	gameScene.addChild(colors);
	
		// Sprites
		greenButton = new Sprite(id["Green Button.png"]);
		blueButton = new Sprite(id["Blue Button.png"]);
		yellowButton = new Sprite(id["Yellow Button.png"]);
		redButton = new Sprite(id["Red Button.png"]);
		
		// Buttons to colors Container
		colors.addChild(greenButton);
		colors.addChild(blueButton);
		colors.addChild(yellowButton);
		colors.addChild(redButton);
		
		// Red Button
		redButton.anchor.x = 0.5;
		redButton.anchor.y = 0.5;
		redButton.position.x = -100;
		redButton.position.y = -100;
		redButton.scale.x = 0.8;
		redButton.scale.y = 0.8;
		redButton.interactive = true;
		redButton.on('mousedown', redSays);
		
		// Blue Button
		blueButton.anchor.x = 0.5;
		blueButton.anchor.y = 0.5;
		blueButton.position.x = 100;
		blueButton.position.y = -100;
		blueButton.scale.x = 0.8;
		blueButton.scale.y = 0.8;
		blueButton.interactive = true;
		blueButton.on('mousedown', blueSays);
		
		// Green Button
		greenButton.anchor.x = 0.5;
		greenButton.anchor.y = 0.5;
		greenButton.position.x = -100;
		greenButton.position.y = 100;
		greenButton.scale.x = 0.8;
		greenButton.scale.y = 0.8;
		greenButton.interactive = true;
		greenButton.on('mousedown', greenSays);
		
		// Yellow Button
		yellowButton.anchor.x = 0.5;
		yellowButton.anchor.y = 0.5;
		yellowButton.position.x = 100;
		yellowButton.position.y = 100;
		yellowButton.scale.x = 0.8;
		yellowButton.scale.y = 0.8;
		yellowButton.interactive = true;
		yellowButton.on('mousedown', yellowSays);
	
	/*******************************************************************************************************
	Game Over Scene
	*******************************************************************************************************/
	gameOverScene = new Container();
	stage.addChild(gameOverScene);
	gameOverScene.visible = false;
	
	/*******************************************************************************************************
	Render Setup!
	*******************************************************************************************************/
	renderer.render(stage);
	state = introduction;
	gameLoop();
}

/**********************************************************************************************************
GameLoop 
**********************************************************************************************************/
function gameLoop() {
	requestAnimationFrame(gameLoop);
	state();
	renderer.render(stage);
}

/**********************************************************************************************************
State Functions
**********************************************************************************************************/

	function introduction() {
		
	}

	function gameFirstPass() {
		simonSays();
		state = game;
		
	}
	
	function credits() {
		
	}
	
	function game() {
		player();
	}
	
	function end() {
		
	}

/**********************************************************************************************************
Helper Functions
***********************************************************************************************************/

	/*******************************************************************************************************
	Start Handler
	*******************************************************************************************************/
	
	function startHandler(e){
		introScene.visible = false;
		state = gameFirstPass;
		gameScene.visible = true;
	}
	
	/*******************************************************************************************************
	Help Handler
	*******************************************************************************************************/
	
	function helpHandler(e){
		introScene.visible = false;
		helpScene.visible = true;
	}
	
	/*******************************************************************************************************
	Back Handler
	*******************************************************************************************************/
	function backHandler(e){
		introScene.visible = true;
		// Make sure other scenese aren't visible	
		helpScene.visible = false;
		creditScene.visible = false;
		gameScene.visible = false;
	}
	
	/*******************************************************************************************************
	Credit Back Handler
	*******************************************************************************************************/
	function creditBackHandler(e){
		introScene.visible = true;
		// Make sure other scenes aren't visible	
		helpScene.visible = false;
		creditScene.visible = false;
		gameScene.visible = false;
	}
	
	/*******************************************************************************************************
	Credits Handler
	*******************************************************************************************************/
	function creditHandler(e){
		introScene.visible = false
		creditScene.visible = true;
	}
	
	/*******************************************************************************************************
	Red Says
	*******************************************************************************************************/
	function redSays(e){
		globalCount++;
		playerSays = 1;
		playerSaid.push(playerSays);
		console.log(arraysEqual(playerSaid, says));
		console.log(globalCount == says.length);
	}
	
	/*******************************************************************************************************
	Blue Says
	*******************************************************************************************************/
	function blueSays(e){
		globalCount++;
		playerSays = 2;
		playerSaid.push(playerSays);
		console.log(arraysEqual(playerSaid, says));
		console.log(globalCount == says.length);
		
	}
	
	/*******************************************************************************************************
	Green Says
	*******************************************************************************************************/
	function greenSays(e){
		globalCount++;
		playerSays = 3;
		playerSaid.push(playerSays);
		console.log(arraysEqual(playerSaid, says));
		console.log(globalCount == says.length);
		
	}
	
	
	/*******************************************************************************************************
	Yellow Says
	*******************************************************************************************************/
	function yellowSays(e){
		globalCount++;
		playerSays = 4;
		playerSaid.push(playerSays);
		console.log(arraysEqual(playerSaid, says));
		console.log(globalCount == says.length);
		
	}
	
	/*******************************************************************************************************
	Random Integer Function 
	*******************************************************************************************************/
	// Random generates a number from [0,1). Min and max reachable.
	function randomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	/*******************************************************************************************************
	Simon Says
	*******************************************************************************************************/
	// 1 = Red
	// 2 = Blue
	// 3 = Green
	// 4 = Yellow

	function simonSays(){
		
		// Push a number between [1,4]
		says.push(randomInt(1,4));
		
		// Play animations
		for(var i = 0; i<says.length; i++) {
			startTimer;
			// Red 
			if (says[i] === 1){
				createjs.Tween.get(redButton.position).to({x: -110, y: -110}, 1000, createjs.Ease.bounceOut)
				.to({x: -100, y: -100}, 500, createjs.Ease.bounceOut);
				startTimer;
			}
		
			// Blue
			else if (says[i] === 2){
				createjs.Tween.get(blueButton.position).to({x: 110, y: -110}, 1000, createjs.Ease.bounceOut)
				.to({x: 100, y: -100}, 500, createjs.Ease.bounceOut);
				startTimer;
			}
			
			// Green
			else if (says[i] === 3){
				createjs.Tween.get(greenButton.position).to({x: -110, y: 110}, 1000, createjs.Ease.bounceOut)
				.to({x: -100, y: 100}, 500, createjs.Ease.bounceOut);
				startTimer;
				
			}
			
			// Yellow
			else if (says[i] === 4){
				createjs.Tween.get(yellowButton.position).to({x: 110, y: 110}, 1000, createjs.Ease.bounceOut)
				.to({x: 100, y: 100}, 500, createjs.Ease.bounceOut);
				startTimer;
			}
		
			else { 
				console.log("An error has occured.");
				}
		}
	}	
	
	
	/*******************************************************************************************************
	Player Says
	*******************************************************************************************************/
	// Player chooses correct button 
		// Request next button OR
		// Repeat simonSays()
	// Player chooses incorrect button -> End Game.
	// Player chooses a button why buttons are animating -> Do Nothing

	function player(){
		
		redButton.interactive = true;
		blueButton.interactive = true;
		greenButton.interactive = true;
		yellowButton.interactive = true;
		
		if(globalCount == says.length){				// Check if Arrays are equal
			if(arraysEqual(playerSaid, says) == true) {		// If Equal 
				globalCount = 0;					// reset globalCount
				redButton.interactive = false;		// set Buttons.interactive to false
				blueButton.interactive = false;
				greenButton.interactive = false;
				yellowButton.interactive = false;
				simonSays();						// call simonSays
				
			}
			else {
				alert("lost.");
			}
				
					
					
				// Else end game and transit to end game scene
					// reset globalCount
					// set Buttons.interactive to false
					// set says = [];
			
		}
	}
	/*******************************************************************************************************
	Timer
	*******************************************************************************************************/	
	function startTimer () {
    timer.start();
    setTimeout(stopTimer,50000);
}

	function stopTimer () {
		timer.stop;
	}
	/*******************************************************************************************************
	Array Equality
	*******************************************************************************************************/
	function arraysEqual(a1,a2) {
		return JSON.stringify(a1)==JSON.stringify(a2);
	}
