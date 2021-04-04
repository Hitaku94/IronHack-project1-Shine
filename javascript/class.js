// Images

let bg = new Image();
bg.src = './Images/bg-forest.png';

let light = new Image();
light.src = './Images/000.png';

let tileSand = new Image();
tileSand.src = './Images/tile_sand.png'

let ghost = new Image();
ghost.src = './Images/pac_man_big_100.png'

let cloud = new Image();
cloud.src = './Images/nature/cloud.png'

let cloud1 = new Image();
cloud1.src = './Images/nature/cloud1.png'

// Class

class Tile {
    constructor(){
        this.x = 0;
        this.y = 400;
        this.tile = 9;
    }
    drawTile(){
        for(let i =0 ; i <= this.tile ; i++) {
            ctx.drawImage(tileSand, this.x + (120 * i), this.y)
        }
    }

}

class Cloud {
    constructor(){
        this.cloud = [
            {x: 100, y: 25},
            {x: 400, y: 25},
            {x: 700, y: 25}
        ];
        this.cloud1 = [
            {x: 300, y: 75},
            {x: 600, y: 75},
            {x: 900, y: 75}
        ];
        this.speed = -0.5;
    }
    drawCloud(){
        
        for(let i = 0; i < this.cloud.length ; i++) {
            ctx.drawImage(cloud, this.cloud[i].x, this.cloud[i].y)
            this.cloud[i].x += this.speed
    
            if (this.cloud[i].x < -130) {
                this.cloud[i] = {x: 1000, y: 25}
            }
        }
        for(let i = 0; i < this.cloud1.length ; i++) {
            ctx.drawImage(cloud1, this.cloud1[i].x, this.cloud1[i].y)
            this.cloud1[i].x += this.speed

            if (this.cloud1[i].x < -130) {
                this.cloud1[i] = {x: 1000, y: 75}
            }
        }
  
    } 
}

class Light {
    constructor(){
        this.x = 360
        this.y = 380
        this.jump = true
        this.height = 22
        this.width = 22
        this.xVelocity = 0
        this.yVelocity = 0
    }
    img(){
        ctx.drawImage(light, this.x, this.y)
    }
    moveJump(){
        for (let i = 0; i <= this.jump ; i++) {
            this.y -= 10
        }
    }
    moveLeft(){
        this.x -= 10
    }
    moveRight(){
        this.x += 10
    }
    collisionFloor(){
        if (this.y >= 380) {
            this.y = 380
        }
        else {
            this.y += 2
        }
    }
}

class Ghost {
    constructor(){
        this.x = 0
        this.y = 285;
    }
    img(){
        ctx.drawImage(ghost, this.x, this.y)
    }
}

class Controller {
    constructor(){
        this.left = false,
        this.right= false,
        this.up = false
    }
    keyListener(event){
        let key_state = true;

        if (event.type == "keydown") {
            key_state = true;
        }
        else {
            key_state = false;
        }

        switch(event.keyCode) {
            case 39: this.right = key_state;
            break;
            case 37: this.left = key_state;
            break;
            case 38: this.up = key_state;
            break;
        }
    }
}