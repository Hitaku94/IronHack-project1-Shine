let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let splashScreen = document.querySelector('#splashScreen');

let bg = new Image();
bg.src = './Images/bg-forest.png';

let light = new Image();
light.src = './Images/000.png';

let tile = new Image();
tile.src = './Images/tile_top.png'

let tileSand = new Image();
tileSand.src = './Images/tile_sand.png'

let tile2 = new Image();
tile2.src = './Images/tile.png'

let ghost = new Image();
ghost.src = './Images/pac_man_big_100.png'

let ghost1 = new Image();
ghost1.src = './Images/pac_man_ghost.png'



function imageDraw(){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(light, 360, 380)
    ctx.drawImage(tileSand, 0, 400)
    ctx.drawImage(tileSand, 120, 400)
    ctx.drawImage(tileSand, 240, 400)
    ctx.drawImage(tileSand, 360, 400)
    ctx.drawImage(tileSand, 480, 400)
    ctx.drawImage(ghost, 0, 285)

}

function start(){
    canvas.style.display = 'block';
    splashScreen.style.display = 'none';
    startBtn.style.display = 'none';
    imageDraw()
}

window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';

})

startBtn.addEventListener('click', () => {
    start()

})