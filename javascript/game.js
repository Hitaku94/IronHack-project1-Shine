let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let splashScreen = document.querySelector('#splashScreen');
let gameOverScreen = document.querySelector('#gameOverScreen');

let bg = new Image();
bg.src = './Images/bg-forest.png';


let tile = new Tile()
let cloudImage = new Cloud()
let lightPerson = new Light()
let ghostPerson = new Ghost()
let columnBlock = new Column()
let scoreChrono = new Chronometer()

let score = scoreChrono.currentTime
let intervalId = 0;
let isGameOver = false;
let controllerBall = {
    left:false,
    right:false,
    up:false,

    keyListener:function(event) {

        let key_state = (event.type == "keydown")?true:false;
    
        switch(event.keyCode) {
    
          case 37:// left key
            controllerBall.left = key_state;
          break;
          case 38:// up key
            controllerBall.up = key_state;
          break;
          case 39:// right key
            controllerBall.right = key_state;
          break;
    
        }
    
    }
};

function start(){
    canvas.style.display = 'block';
    splashScreen.style.display = 'none';
    startBtn.style.display = 'none';
    
    animation()
}

function animation(){
    
    
    movement()
    collision()
    imageDraw()
    window.addEventListener("keydown", controllerBall.keyListener);
    window.addEventListener("keyup", controllerBall.keyListener);
    
    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        canvas.style.display = 'none'
        restartBtn.style.display = 'block'
        gameOverScreen.style.display = 'block';
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
    

 
}

function imageDraw(){
    ctx.drawImage(bg, 0, 0)
    columnBlock.drawColumn()
    tile.drawTile()
    cloudImage.drawCloud()
    lightPerson.img()
    ghostPerson.img()

    ctx.font = "20px Verdana"
    ctx.fillText(`Score is ${score}`, canvas.width - 200, 50)
    
}

function collision(){
    lightPerson.collision()

    for (let i = 0; i < columnBlock.column.length ; i++) {

    
        if (lightPerson.x + light.width >= columnBlock.column[i].x && lightPerson.y + light.height >= columnBlock.column[i].y &&
         lightPerson.x < columnBlock.column[i].x + column.width) {
        lightPerson.x += columnBlock.speed
        controllerBall.right = false;
        }   

        if (lightPerson.y + light.height >= columnBlock.column[i].y && lightPerson.x + light.width <= columnBlock.column[i].x + column.width + 15 &&
         lightPerson.x >= columnBlock.column[i].x - 10) {
            lightPerson.y = columnBlock.column[i].y - light.height
            lightPerson.yVelocity = 0
            lightPerson.xVelocity = 0
            lightPerson.jump = false
        }

        if (columnBlock.column[i].x + column.width == ghostPerson.x + ghost.width) {
            score += 1
        }
    }
    
    if (lightPerson.x <= ghostPerson.x + ghost.width - light.width && lightPerson.y >= ghostPerson.y) {
        isGameOver = true;
    }
        
}

function movement(){

    

     if (controllerBall.up && lightPerson.jump == false) {
        
        lightPerson.yVelocity -= 50;
        lightPerson.jump = true;
        
        
    }

    if (controllerBall.left) {
        lightPerson.xVelocity -= 0.5;
        
    }

    if (controllerBall.right) {
        lightPerson.xVelocity += 0.5;
        
    }
    
    lightPerson.yVelocity += 1.5; //gravity
    lightPerson.x += lightPerson.xVelocity;
    lightPerson.y += lightPerson.yVelocity;
    lightPerson.xVelocity *= 0.9; //friction
    lightPerson.yVelocity *= 0.9; //friction 

}

function restart(){
    isGameOver = false;
    restartBtn.style.display = 'none';
    gameOverScreen.style.display = 'none';

    start()

}

// event listener

startBtn.addEventListener('click', () => {
    start()
})

restartBtn.addEventListener('click', () => {
    restart()
})

window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';
    gameOverScreen.style.display = 'none';
})


