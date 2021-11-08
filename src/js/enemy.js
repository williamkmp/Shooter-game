class Enemy{
    constructor(game, _x, _y){
        this.game   = game;
        this.color  = 'hsl('+ (Math.random() * 360) +',100%,61%)';
        this.radius =  Math.random() * (60 - 20) + 20;
        this.position={
            x   : _x,
            y   : _y
        }
        this.speed  ={
            x   : 0,
            y   : 0 
        }
        this.movement = 0;

        if(Math.random() <= 0.5){
            this.position.x = Math.random() <= 0.5 ? 0 - this.radius : this.game.canvas.width + this.radius;
            this.position.y = Math.random() * this.game.canvas.height;
        }else{
            this.position.y = Math.random() <= 0.5 ? 0 - this.radius : this.game.canvas.height + this.radius;
            this.position.x = Math.random() * this.game.canvas.width;
        }
    }
    update(){
        this.speed.x    = Math.cos(Math.atan2(this.game.player.position.y - this.position.y, this.game.player.position.x - this.position.x));
        this.speed.y    = Math.sin(Math.atan2(this.game.player.position.y - this.position.y, this.game.player.position.x - this.position.x)); 
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
    draw(context){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle  = this.color;
        context.fill();
    }
}