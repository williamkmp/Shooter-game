class Bullet{
    constructor(game, toX, toY){
        this.game   = game;
        this.radius = 10;
        this.speed = {
            x   : toX,
            y   : toY 
        }
        this.position = {
            x   : this.game.player.position.x,
            y   : this.game.player.position.y
        }
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }

    draw(context){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle  = 'orange';
        context.fill();
    }

}