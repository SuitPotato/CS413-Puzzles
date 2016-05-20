/**********************************************************************************************************
Keith Saunders Project 2 - Puzzles
**********************************************************************************************************/

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
	.add("images/sheet.json")
	//.on("progress", loadProgressHandler)
	.load(setup);
	

/***********************************************************************************************************
Var Declaration
***********************************************************************************************************/
var state;
var buttons, start, play, help, credits;

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
	credits = new Sprite(id["Credits Button.png"]);
	
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
		play.position.x = 0;
		play.position.y = 0;
	
		// Help Button
		buttons.addChild(help);
		help.anchor.x = 0.5;
		help.anchor.y = 0.5;
		help.position.x = 0;
		help.position.y = 30;
		
		// Credits Button
		credits.addChild(credits);
		credits.anchor.x = 0.5;
		credits.anchor.y = 0.5;
		credits.position.x = 0;
		credits.position.y = 60;	
	
	/*******************************************************************************************************
	Help Scene
	*******************************************************************************************************/
	helpScene = new Container();
	stage.addChild(helpScene);
	helpScene.visible = false;
	
	/*******************************************************************************************************
	Credits Scene
	*******************************************************************************************************/
	creditsScene = new Container();
	stage.addChild(creditsScene);
	creditsScene.visible = false;
	
	/*******************************************************************************************************
	Game Scene
	*******************************************************************************************************/
	gameScene = new Container();
	stage.addChild(gameScene);
	gameScene.visible = false;
	
	// Game Screen
	gameScreen = new Sprite(id["Game Screen"]);	
	gameScene.addchild(gameScreen);
	
	
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
	state = play;
	gameLoop();
}



/**********************************************************************************************************
GameLoop 
**********************************************************************************************************/
function gameLoop() {
	// Constantly loop through this function
	requestAnimationFrame(gameLoop);
	// Call the state
	state();
	// Render the stage
	renderer.render(stage);
}


/**********************************************************************************************************
State Functions
**********************************************************************************************************/


/**********************************************************************************************************
Helper Functions
***********************************************************************************************************