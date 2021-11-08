const canvas    = document.getElementById("gameScreen");
const context   = canvas.getContext("2d");
canvas.width 	= window.innerWidth;
canvas.height	= window.innerHeight; 

let game 		= new Game(canvas.width, canvas.height);

//main game loop
function gameLoop(){
	game.update();
    game.draw(context);
	requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);