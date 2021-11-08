class Player{
    constructor(game){
        this.game   = game;
        this.radius = 30;
        this.maxSpeed = 5;
        this.speed  ={
            x   : 0,
            y   : 0
        }
        this.position = {
            x   : this.game.canvas.width / 2,
            y   : this.game.canvas.height/ 2
        }
    }

    draw(context) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = "white";
        context.fill();
    }

    update(){
        if(this.position.x - this.radius <= 0) this.position.x = 0 + this.radius;
        if(this.position.y - this.radius <= 0) this.position.y = 0 + this.radius;
        if(this.position.x + this.radius >= this.game.canvas.width) this.position.x = this.game.canvas.width - this.radius;
        if(this.position.y + this.radius >= this.game.canvas.height) this.position.x = this.game.canvas.height - this.radius;
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }

    shoot(mouseX, mouseY){
        let x       = Math.cos(Math.atan2(mouseY - this.position.y, mouseX - this.position.x)) * 7;
        let y       = Math.sin(Math.atan2(mouseY - this.position.y, mouseX - this.position.x)) * 7;
        this.game.bullets.push( new Bullet(this.game, x, y));
    }

    moveLeft(){
        this.speed.x = -this.maxSpeed;
    }

    moveRight(){
        this.speed.x = this.maxSpeed;
    }

    moveUp(){
        this.speed.y = -this.maxSpeed;
    }

    moveDown(){
        this.speed.y = this.maxSpeed;
    }

    stopX(){
        this.speed.x = 0;
    }

    stopY(){
        this.speed.y = 0;
    }

}