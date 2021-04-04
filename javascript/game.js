let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let splashScreen = document.querySelector('#splashScreen');



let tile = new Tile()
let cloudImage = new Cloud()
let lightPerson = new Light()
let ghostPerson = new Ghost()
let controller = new Controller()

/*document.addEventListener("keydown", (event) => {
    if (event.code == `ArrowRight`) {
        lightPerson.moveRight()
    }
    if (event.code == `ArrowLeft`) {
        lightPerson.moveLeft()
    }
    if (event.code == "ArrowUp") {
        lightPerson.moveJump()
    }
})*/

function imageDraw(){
    ctx.drawImage(bg, 0, 0)
    tile.drawTile()
    cloudImage.drawCloud()
    lightPerson.img()
    ghostPerson.img()
}

function animation(){
    imageDraw()
    movement()
    collision()
    requestAnimationFrame(animation)
 
}

function start(){
    canvas.style.display = 'block';
    splashScreen.style.display = 'none';
    startBtn.style.display = 'none';
    
    animation()
}

function collision(){
    lightPerson.collisionFloor()
}

function movement(){
    if (controller.up && lightPerson.jump == false) {
        lightPerson.yVelocity -= 20;
        lightPerson.jump = true;
    }

    if (controller.left == true) {
        lightPerson.xVelocity -= 0.5;
    }

    if (controller.right == true) {
        lightPerson.xVelocity += 0.5;
    }

    lightPerson.yVelocity += 1.5; //gravity
    lightPerson.x += lightPerson.xVelocity;
    lightPerson.y += lightPerson.yVelocity;
    lightPerson.xVelocity *= 0.9; //friction
    lightPerson.yVelocity *= 0.9; //friction

}
// event listener

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)

startBtn.addEventListener('click', () => {
    start()
})

window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';
})


