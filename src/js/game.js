const GAMESTATE = {
    RUNNING : 0, 
    PAUSED  : 1,
    MENU    : 2,
    OVER    : 3
}

class Game{
    constructor(_width, _height){
        this.canvas         = {
            width   : _width,
            height  : _height
        };
        this.context        = canvas.getContext("2d");
        this.inputHandler   = new InputHandler(this);;
        this.player         = new Player(this);;
        this.enemys         = [];
        this.bullets        = [];
        this.score          = 0;   
        this.gameState      = GAMESTATE.MENU;
        this.audio          = document.getElementById("music");

        // this.context.fillRect(0,0, canvas.width, canvas.height);
    }

    playMusic(){
        this.audio.play();
    }

    pauseMusic(){
        this.audio.pause();
    }

    stopMusic(){
        this.pauseMusic();
        this.audio.currentTime = 0;
    }

    reset(){
        this.player         = new Player(this);;
        this.enemys         = [];
        this.bullets        = [];
        this.score          = 0;
    }

    start(){
        if(this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.OVER){
            if(this.gameState === GAMESTATE.OVER) this.reset();
            this.playMusic();
            this.gameState      = GAMESTATE.RUNNING;
        }   
    }

    draw(context){
        if(this.gameState === GAMESTATE.RUNNING){
            //to clear screen
            context.fillStyle = "rgba(0,0,0,0.1)";
            context.fillRect(0,0,this.canvas.width,this.canvas.height);
            context.font = "10px Arial";
            [this.player, ...this.enemys, ...this.bullets].forEach((object) => object.draw(context));
        }else if (this.gameState === GAMESTATE.MENU){
            context.fillStyle = "black";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.fillStyle = "rgba(255,255,255, 0.6)";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.font = "50px Arial";
            context.fillStyle = "black";
            context.textAlign = "center";
            context.fillText("press SPACE to start", this.canvas.width/2, this.canvas.height/2);
        }else if (this.gameState === GAMESTATE.PAUSED){
            context.fillStyle = "black";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.fillStyle = "rgba(255,255,255, 0.7)";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.font = "50px Arial";
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText("PAUSED", this.canvas.width/2, this.canvas.height/2);
            this.pauseMusic();
        }else if(this.gameState === GAMESTATE.OVER){
            context.fillStyle = "black";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.fillStyle = "rgba(255,255,255, 0.6)";
            context.fillRect(0,0,this.canvas.width, this.canvas.height);
            context.font = "50px Arial";
            context.fillStyle = "black";
            context.textAlign = "center";
            let string = "Game Over " + "SCORE : " + this.score + " hit SPACE to play";
            context.fillText(string, this.canvas.width/2, this.canvas.height/2);
            this.stopMusic();
        }
    }

    update(){
        if(this.gameState === GAMESTATE.RUNNING){
            setInterval(() => {
                if(this.enemys.length < 6) this.enemys.push(new Enemy(this));
            }, 1000);
            this.enemys.forEach((enemy, enemyIndex) =>{
                this.bullets.forEach((bullet, bulletIndex) =>{
                    if (Math.hypot(enemy.position.x - bullet.position.x, enemy.position.y - bullet.position.y) - enemy.radius - bullet.radius < 1){
                        this.bullets.splice(bulletIndex, 1);
                        enemy.radius -= 10;
                        this.score += 10;
                    }
                });
                if(enemy.radius < 20){
                    this.enemys.splice(enemyIndex,1);
                }
                if(Math.hypot(enemy.position.x - this.player.position.x, enemy.position.y - this.player.position.y) - enemy.radius - this.player.radius < 1){
                    this.gameState = GAMESTATE.OVER;
                }
            });
            this.bullets.forEach((bullet, index) => {
                if(bullet.position.x >= this.canvas.width || bullet.position.x <= 0 || 
                   bullet.position.y >= this.canvas.height || bullet.position.y <= 0){
                       this.bullets.splice(index, 1)
                   }
            });
            [this.player, ...this.enemys, ...this.bullets].forEach((object) => object.update());
        }
    }

    tooglePause(){
        if(this.gameState === GAMESTATE.PAUSED){
            this.gameState = GAMESTATE.RUNNING;
            this.playMusic();
        }else if(this.gameState === GAMESTATE.RUNNING){
            this.gameState = GAMESTATE.PAUSED;
            this.pauseMusic();
        }
    }
}