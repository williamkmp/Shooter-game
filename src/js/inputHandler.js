class InputHandler{
    constructor(game){
        this.game = game;
        //if user press key
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:                        //left arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.moveLeft();
                    break;
                case 38:                        //up arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.moveUp();
                    break;
                case 39:                        //right arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.moveRight();
                    break;
                case 40:                        //down arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.moveDown();
                    break;
                case 27:                        //esc key
                    this.game.tooglePause();
                    break;
                case 32:                        //space key
                    this.game.start();
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 37:                        //left arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.stopX();
                    break;
                case 38:                        //up arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.stopY();
                    break;
                case 39:                        //right arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.stopX();
                    break;
                case 40:                        //down arrow
                    if(this.game.gameState === GAMESTATE.RUNNING) this.game.player.stopY();
                    break;
            }
        });

        document.addEventListener('click', (event) => {
            if(this.game.gameState === GAMESTATE.RUNNING){
                this.game.player.shoot(event.clientX, event.clientY);
            }
        });
    }
}