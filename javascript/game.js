let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');


let result = document.querySelector('#result');
let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let marioAudio = document.querySelector('#marioAudio');
let playmutebtn = document.querySelector('#playmutebtn')
let splashScreen = document.querySelector('#splashScreen');
let gameOverScreen = document.querySelector('#gameOverScreen');



let bg = new Image();
bg.src = './Images/bg-forest.png';
let tuto = new Image();
tuto.src = './Images/tutoPlateform.png';
let iconRight = new Image();
iconRight.src = './Images/arrowRightIcon.png';
let iconLeft = new Image();
iconLeft.src = './Images/arrowLeft.png';
let iconUp = new Image();
iconUp.src = './Images/arrowUp.png';


// SOUNDS PLACES

let audioOff = new Image()
audioOff.src = './Images/audioOff.png'
let audioOn = new Image()
audioOn.src = './Images/audioOn.png'

let marioPlaylist = ['./music/mario-odyssey.mp3', './music/remix-super-mario-sunshine.mp3', './music/super-mario-bros-2.mp3',
 './music/super-mario-world-athletic.mp3']

let musicSplash = new Audio('./music/zelda-theme.mp3')
let musicOver = new Audio('./music/super-smash-bros.mp3')
let heyListen = new Audio('./music/hey_listen.mp3')
let handPan = new Audio('./music/a-fast-handpan.mp3')
let mario = new Audio(marioPlaylist[Math.floor(Math.random() * marioPlaylist.length)])

handPan.playbackRate = 1.2;
mario.playbackRate = 1.2;
musicSplash.volume = 0.1;
musicSplash.loop = true;
musicOver.volume = 0.1;
musicOver.loop = true;
handPan.volume = 0.3;
handPan.loop = true;
mario.volume = 0.3;
mario.loop = true;


// object from classes

let tile = new Tile()
let cloudImage = new Cloud()
let lightPerson = new Light()
let ghostPerson = new Ghost()
let columnBlock = new Column()
let treeBg = new Tree()
let arrow = new Arrow()
let bush = new Bush()

//Variable Call 

let N_ofHighScore = 5;
let highScr = 'highScores';
let highScoreString = localStorage.getItem(highScr);

let score = 0
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

function tutorial(){
    canvas.style.display = 'block';
    splashScreen.style.display = 'none';
    startBtn.style.display = 'none';
    marioAudio.style.display = 'block'
    musicSplash.pause()
    
    imageDraw()
    ctx.drawImage(tuto, 425, 50)
    ctx.drawImage(tuto, 335, 200)
    ctx.drawImage(tuto, 515, 200)
    ctx.drawImage(iconUp, 475, 110)
    ctx.drawImage(iconLeft, 385, 260)
    ctx.drawImage(iconRight, 570, 260)

    ctx.font = "bold 25px Times"
    ctx.fillText("Jump", 470, 100)
    ctx.fillText("Left", 390, 250)
    ctx.fillText("Right", 565, 250)
    ctx.fillText("Press left, down or up to start", 350, 25)
    let toggle = false;
    let toggle1 = false;
    document.addEventListener('keydown', (event) => {
       
        if (event.code == 'ArrowUp' || event.code == 'ArrowLeft' || event.code == 'ArrowRight')
            if (!toggle && !toggle1) {
                start()
                toggle1 = true;
            }
    })
    
}

function start(){

    handPan.play()
    
    animation()

}

function restart(){
    isGameOver = false;
    canvas.style.display = 'block';
    restartBtn.style.display = 'none';
    gameOverScreen.style.display = 'none';
    score = 0;
    musicOver.pause()

// class reset
    tile = new Tile()
    cloudImage = new Cloud()
    lightPerson = new Light()
    ghostPerson = new Ghost()
    columnBlock = new Column()
    treeBg = new Tree()
    arrow = new Arrow()
    bush = new Bush()
    musicOver = new Audio('./music/super-smash-bros.mp3')
    handPan = new Audio('./music/a-fast-handpan.mp3')
    mario = new Audio(marioPlaylist[Math.floor(Math.random() * marioPlaylist.length)])

// music reset
    handPan.playbackRate = 1.2;
    mario.playbackRate = 1.2;
    musicSplash.volume = 0.1;
    musicSplash.loop = true;
    musicOver.volume = 0.1;
    musicOver.loop = true;
    handPan.volume = 0.2;
    handPan.loop = true;
    mario.volume = 0.2;
    mario.loop = true;

    start()

}

function animation(){
    
    
    movement()
    collision()
    imageDraw()
    canvasMovement()

// addEventListener for controller

    window.addEventListener("keydown", controllerBall.keyListener);
    window.addEventListener("keyup", controllerBall.keyListener);
    
// game Over 

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        result.innerText = score
        canvas.style.display = 'none'
        restartBtn.style.display = 'block'
        gameOverScreen.style.display = 'block';
        marioAudio.style.display = 'none'
        musicOver.play()
        handPan.pause()
        mario.pause()
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }

}

function imageDraw(){

    ctx.drawImage(bg, 0, 0)
    treeBg.drawTree()
    bush.drawBush()
    arrow.drawArrow()
    columnBlock.drawColumn()
    tile.drawTile()
    cloudImage.drawCloud()
    lightPerson.img()
    ghostPerson.img()



    
//score text

    ctx.font = "20px Times"
    ctx.fillText(`Score is ${score}`, canvas.width - 200, 50)
    
}

function collision(){ 
    lightPerson.collision()

// Collision with the columns

    for (let i = 0; i < columnBlock.column.length ; i++) {

    //collision left side
        if (lightPerson.x + light.width >= columnBlock.column[i].x && lightPerson.y + light.height >= columnBlock.column[i].y + 10 &&
            lightPerson.x < columnBlock.column[i].x + column.width/2 - 10) {

        lightPerson.x = columnBlock.column[i].x - light.width
       
        }   

    //collision right side
        if (lightPerson.x >= columnBlock.column[i].x && lightPerson.y + light.height >= columnBlock.column[i].y + 10 &&
            lightPerson.x <= columnBlock.column[i].x + column.width) {
   
           lightPerson.x = columnBlock.column[i].x + column.width
   
           }

    //collision top side
        if (lightPerson.y + light.height > columnBlock.column[i].y && lightPerson.y + light.height < columnBlock.column[i].y + 10 && lightPerson.x + light.width <= columnBlock.column[i].x + column.width + 15 &&
         lightPerson.x >= columnBlock.column[i].x - 15) {

            lightPerson.y = columnBlock.column[i].y - light.height
            lightPerson.yVelocity = 0
            //lightPerson.xVelocity = 0
            lightPerson.jump = false

        }

//score point
        if (columnBlock.column[i].x + column.width <= 0) {
            score += 1
        }
    }

    // collision right side
    if (lightPerson.x >= columnBlock.column1.x && lightPerson.y + light.height >= columnBlock.column1.y + 10 &&
        lightPerson.x <= columnBlock.column1.x + column.width && lightPerson.y <= columnBlock.column1.y + column.height - 20) {
            console.log("hello left")
       lightPerson.x = columnBlock.column1.x + column.width
       
    }   

    // collision left side
    if (lightPerson.x + light.width >= columnBlock.column1.x && lightPerson.y + light.height >= columnBlock.column1.y + 10 &&
        lightPerson.x < columnBlock.column1.x + column.width/2 - 10 && lightPerson.y <= columnBlock.column1.y + column.height - 20 ) {
            console.log("hello right")
       lightPerson.x = columnBlock.column1.x - light.width
       
    }   
    // collision up
    if (lightPerson.y + light.height >= columnBlock.column1.y && lightPerson.x + light.width <= columnBlock.column1.x + column.width + 10 &&
        lightPerson.x >= columnBlock.column1.x - 20 && lightPerson.y + light.height <= columnBlock.column1.y + 20) {

            
           lightPerson.y = columnBlock.column1.y - light.height
           lightPerson.yVelocity = 0
           //lightPerson.xVelocity = 0
           lightPerson.jump = false
           
     }

    // collision bottom
    if (lightPerson.y <= columnBlock.column1.y + column.height && lightPerson.x + light.width <= columnBlock.column1.x + column.width + 10 &&
        lightPerson.x >= columnBlock.column1.x - 20 && lightPerson.y + light.height >= columnBlock.column1.y + column.height - 20) {
            console.log("hello bottom")
            lightPerson.y = columnBlock.column1.y + column.height
            lightPerson.yVelocity += 10;
            lightPerson.jump = true
        }

// score point
    if (columnBlock.column1.x + column.width <= 0) {
           score += 1
    }

// collision ball with canvas right side  
    if (lightPerson.x >= 610) {
        lightPerson.x = 610
    }   

// collision ghost
    if (lightPerson.x <= ghostPerson.x + ghost.width - light.width) {
        isGameOver = true;
    }
        


}

//Movement function
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

function canvasMovement(){
    if (lightPerson.x >= 610 && controllerBall.right) {
        for (let i = 0; i < columnBlock.column.length; i++) {
            columnBlock.column[i].x += columnBlock.speed
        }
        columnBlock.column1.x += columnBlock.speed
        treeBg.tree.x += treeBg.speed
        treeBg.tree1.x += treeBg.speed
        treeBg.tree2.x += treeBg.speed
        treeBg.tree3.x += treeBg.speed
        arrow.x += arrow.speed
        bush.bush.x += bush.speed
        bush.bush1.x += bush.speed
        bush.bush2.x += bush.speed
        bush.bush3.x += bush.speed
        //tile.x += tile.speed;
        ghostPerson.x -= 6.5
    }
}

//Board score function
function checkHighScore(score){
    let highScores = JSON.parse(highScoreString);
    let lowestScore = highScores[N_ofHighScore - 1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore()
        showHighScore()
    }
}

function saveHighScore(score, highScores){
    let name = prompt("Well done you entered the highScore board ! Enter name:");
    let newScore = { score, name };

    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(N_ofHighScore);
    localStorage.setItem(highScr, JSON.stringify(highScores));
}

function showHighScore(){
    let highScores = JSON.parse(localStorage.getItem(highScr)) || [];
    let highScoreList = document.getElementById(highScr);

    highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join('');
}

//Music
function playMute(){
    if(musicSplash.muted) {
        musicSplash.muted = false;
        musicOver.muted = false;
        handPan.muted = false;
        mario.muted = false;
        playmutebtn.style.background = "url(Images/audioOn.png) no-repeat";
    } else {
        musicSplash.muted = true;
        musicOver.muted = true;
        handPan.muted = true;
        mario.muted = true;
        playmutebtn.style.background = "url(Images/audioOff.png) no-repeat";
    }
}
// event listener


startBtn.addEventListener('click', () => {
    tutorial()
    heyListen.play()
})

restartBtn.addEventListener('click', () => {
    restart()
    
})

playmutebtn.addEventListener('click', () => {
    playMute()
})

document.addEventListener("keydown", (event) => {
    let toggle = false;
    if (event.code == 'Space') {
        if (!handPan.paused && !toggle) {
            handPan.pause();
            mario.play();
            toggle = true;
        }
        if (!mario.paused && !toggle) {
            mario.pause();
            handPan.play();
            toggle = true;
            
        }

    }
})


window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';
    gameOverScreen.style.display = 'none';
    marioAudio.style.display = 'none'
    musicSplash.play()
})



