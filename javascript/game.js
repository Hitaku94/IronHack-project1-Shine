let canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

let userName = document.querySelector('input')
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

let superMan = new Superman()
let tile = new Tile()
let cloudImage = new Cloud()
let lightPerson = new Light()
let ghostPerson = new Ghost()
let columnBlock = new Column()
let treeBg = new Tree()
let arrow = new Arrow()
let bush = new Bush()

//Variable Call 



let powerC = false;
let powerCtime = 0;
let powerD = false;
let powerDtime = 0;
let onPlateform = false;
let score = 0
//let intervalId = 0;
let isGameOver = false;
let controllerBall = {
    left: false,
    right: false,
    up: false,

    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

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

function tutorial() {
    canvas.style.display = 'block';
    splashScreen.style.display = 'none';
    startBtn.style.display = 'none';
    marioAudio.style.display = 'block'
    musicSplash.pause()

    imageDraw()
    ctx.drawImage(tuto, 425, 50)
    ctx.drawImage(tuto, 335, 200)
    ctx.drawImage(tuto, 515, 200)
    ctx.drawImage(tuto, 50, 25)
    ctx.drawImage(tuto, 200, 25)
    ctx.drawImage(iconUp, 475, 110)
    ctx.drawImage(iconLeft, 385, 260)
    ctx.drawImage(iconRight, 570, 260)

    ctx.font = "10px Times"
    ctx.fillText("(marvel)", 310, 105)
    ctx.font = "bold 40px Times"
    ctx.fillText("D", 110, 80)
    ctx.fillText("C", 260, 80)
    ctx.font = "20px Times"
    ctx.fillText("Jump higher", 75, 115)
    ctx.fillText("Repulse", 240, 105)
    ctx.fillText("the darkness", 228, 125)
    ctx.fillText("They need time to charge", 100, 200)
    ctx.fillText("Use it wisely ", 140, 225)
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

function start() {

    handPan.play()
   
    animation()
    
    
}

function restart() {
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

function animation() {
    
    power()
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
        getHighScore(userName.value, score)
        
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }

}

function imageDraw() {

    ctx.drawImage(bg, 0, 0)
    treeBg.drawTree()
    bush.drawBush()
    arrow.drawArrow()
    columnBlock.drawColumn()
    tile.drawTile()
    cloudImage.drawCloud()
    lightPerson.img()
    ghostPerson.img()
    superMan.image()


    //score text

    ctx.font = "20px Times"
    ctx.fillText(`Score is ${score}`, canvas.width - 200, 50)

    if (powerDtime >= 5) {
        ctx.font = "20px Times"
        ctx.fillText('"D" is ready!', 50, 50)
    }
     if (powerCtime >= 12) {
        ctx.font = "20px Times"
        ctx.fillText('"C" is ready!', 50, 75)
    
    }
}
function collision() {
    lightPerson.collision()
    if (lightPerson.y >= 380) {
        lightPerson.y = 380
        lightPerson.jump = false
        onPlateform = false;
    }
    if (lightPerson.x < 0) {
        lightPerson.x = 0
    }
    // Collision with the columns

    for (let i = 0; i < columnBlock.column.length; i++) {

        //collision left side
        if (lightPerson.x + light.width >= columnBlock.column[i].x + 2 && lightPerson.y + light.height >= columnBlock.column[i].y + 10 &&
            lightPerson.x + light.width <= columnBlock.column[i].x + column.width / 2 && lightPerson.y <= columnBlock.column[i].y + column.height - 20) {

            lightPerson.x = columnBlock.column[i].x - light.width
            lightPerson.jump = true
            lightPerson.xVelocity = 0

        }

        //collision right side
        if (lightPerson.x >= columnBlock.column[i].x && lightPerson.y + light.height >= columnBlock.column[i].y + 10 &&
            lightPerson.x <= columnBlock.column[i].x + column.width - 2 && lightPerson.y <= columnBlock.column[i].y + column.height - 20) {

            lightPerson.x = columnBlock.column[i].x + column.width
            lightPerson.jump = true
            lightPerson.xVelocity = 0

        }

        //collision top side
        if (lightPerson.y + light.height >= columnBlock.column[i].y && lightPerson.y + light.height <= columnBlock.column[i].y + 10 && lightPerson.x + light.width <= columnBlock.column[i].x + column.width + 15 &&
            lightPerson.x >= columnBlock.column[i].x - 15) {

            onPlateform = true;
            lightPerson.jump = false;
            lightPerson.y = columnBlock.column[i].y - light.height;
            lightPerson.yVelocity = 0;
            

        }

        // collision bottom
        if (lightPerson.y <= columnBlock.column[i].y + column.height && lightPerson.x + light.width <= columnBlock.column[i].x + column.width + 10 &&
            lightPerson.x >= columnBlock.column[i].x - 20 && lightPerson.y + light.height >= columnBlock.column[i].y + column.height - 20) {
            
            lightPerson.y = columnBlock.column[i].y + column.height
            lightPerson.yVelocity += 10;
            lightPerson.jump = true
        }

    }
    if (columnBlock.loop > 30) {
        for (let j = 0; j < columnBlock.column1.length; j++) {
            // collision right side
            if (lightPerson.x >= columnBlock.column1[j].x && lightPerson.y + light.height >= columnBlock.column1[j].y + 10 &&
                lightPerson.x <= columnBlock.column1[j].x + column.width - 2 && lightPerson.y <= columnBlock.column1[j].y + column.height - 20) {

                lightPerson.x = columnBlock.column1[j].x + column.width
                lightPerson.jump = true
                lightPerson.xVelocity = 0

            }

            // collision left side
            if (lightPerson.x + light.width >= columnBlock.column1[j].x + 2 && lightPerson.y + light.height >= columnBlock.column1[j].y + 10 &&
                lightPerson.x + light.width <= columnBlock.column1[j].x + column.width/2 && lightPerson.y <= columnBlock.column1[j].y + column.height - 20) {

                lightPerson.x = columnBlock.column1[j].x - light.width
                lightPerson.jump = true
                lightPerson.xVelocity = 0

            }
            // collision up
            if (lightPerson.y + light.height >= columnBlock.column1[j].y && lightPerson.x + light.width <= columnBlock.column1[j].x + column.width + 10 &&
                lightPerson.x >= columnBlock.column1[j].x - 20 && lightPerson.y + light.height <= columnBlock.column1[j].y + 20) {

                onPlateform = true;
                lightPerson.y = columnBlock.column1[j].y - light.height

                lightPerson.yVelocity = 0
                //lightPerson.xVelocity = 0
                lightPerson.jump = false;

            }

            // collision bottom
            if (lightPerson.y <= columnBlock.column1[j].y + column.height && lightPerson.x + light.width <= columnBlock.column1[j].x + column.width + 10 &&
                lightPerson.x >= columnBlock.column1[j].x - 20 && lightPerson.y + light.height >= columnBlock.column1[j].y + column.height - 20) {
               
                lightPerson.y = columnBlock.column1[j].y + column.height
                lightPerson.yVelocity += 10;
                lightPerson.jump = true
            }

        }
    }
    // collision plateform
    if (columnBlock.loop > 60) {
        for (let k = 0; k < columnBlock.plateform.length; k++) {
            // collision right side
            if (lightPerson.x >= columnBlock.plateform[k].x && lightPerson.y + light.height >= columnBlock.plateform[k].y + 10 &&
                lightPerson.x <= columnBlock.plateform[k].x + bridge.width - 2 && lightPerson.y <= columnBlock.plateform[k].y + bridge.height - 20) {

                lightPerson.x = columnBlock.plateform[k].x + bridge.width
                lightPerson.jump = true
                lightPerson.xVelocity = 0
            }

            // collision left side
            if (lightPerson.x + light.width >= columnBlock.plateform[k].x + 2 && lightPerson.y + light.height >= columnBlock.plateform[k].y + 10 &&
                lightPerson.x < columnBlock.plateform[k].x + bridge.width / 2 && lightPerson.y <= columnBlock.plateform[k].y + bridge.height - 20) {

                lightPerson.x = columnBlock.plateform[k].x - light.width
                lightPerson.jump = true
                lightPerson.xVelocity = 0
            }
            // collision top
            if (lightPerson.y + light.height >= columnBlock.plateform[k].y && lightPerson.x + light.width <= columnBlock.plateform[k].x + bridge.width + 10 &&
                lightPerson.x >= columnBlock.plateform[k].x - 20 && lightPerson.y + light.height <= columnBlock.plateform[k].y + 20) {

                onPlateform = true;
                lightPerson.y = columnBlock.plateform[k].y - light.height

                lightPerson.yVelocity = 0
                //lightPerson.xVelocity = 0
                lightPerson.jump = false

            }

            // collision bottom
            if (lightPerson.y <= columnBlock.plateform[k].y + bridge.height && lightPerson.x + light.width <= columnBlock.plateform[k].x + bridge.width + 10 &&
                lightPerson.x >= columnBlock.plateform[k].x - 20 && lightPerson.y + light.height >= columnBlock.plateform[k].y + bridge.height - 10) {

                lightPerson.y = columnBlock.plateform[k].y + bridge.height
                lightPerson.yVelocity += 10;
                lightPerson.jump = true
            }

        }
    }
    // collision ball with canvas right side  
    if (lightPerson.x >= 610) {
        lightPerson.x = 610
        score += 1
    }

    // collision ghost
    if (lightPerson.x <= ghostPerson.x + ghost.width - light.width) {
        isGameOver = true;
    }

}


//Movement function
function movement() {


    if (controllerBall.up && lightPerson.jump == false) {
        if (onPlateform == true) {
            lightPerson.yVelocity -= 30;
            lightPerson.jump = true;
        }
        else {
            lightPerson.yVelocity -= 40;
            lightPerson.jump = true;
        }


    }

    if (controllerBall.left) {
        lightPerson.xVelocity -= 0.5;

    }

    if (controllerBall.right) {
        lightPerson.xVelocity += 0.5;

    }

    lightPerson.yVelocity += 1.2; //gravity
    lightPerson.x += lightPerson.xVelocity;
    lightPerson.y += lightPerson.yVelocity;
    lightPerson.xVelocity *= 0.9; //friction
    lightPerson.yVelocity *= 0.9; //friction 

    ghostPerson.x += ghostPerson.xVelocity
    ghostPerson.xVelocity *= 0.9; //friction

    superMan.x += superMan.xVelocity
    superMan.y += superMan.yVelocity
    superMan.xVelocity *= 0.9; //friction
    superMan.yVelocity *= 0.9; //friction


    //Power movement
    if(ghostPerson.x == -30) {
        ghostPerson.xVelocity = 0
    }

    if (superMan.y > 600) {
        superMan.xVelocity = 0
        superMan.yVelocity = 0
        superMan.image()
        superMan.x = 900
        superMan.y = -60
    }

}

function canvasMovement() {
    if (lightPerson.x >= 610 && controllerBall.right) {
        for (let i = 0; i < columnBlock.column.length; i++) {
            columnBlock.column[i].x += columnBlock.speed
        }
        for (let j = 0; j < columnBlock.column1.length; j++) {
            columnBlock.column1[j].x += columnBlock.speed
        }
        for (let k = 0; k < columnBlock.plateform.length; k++) {
            columnBlock.plateform[k].x += columnBlock.speed
        }
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

function getHighScore(player, score) {
    
    let newScore = {name: player, score: score};
    let highScoreString = localStorage.getItem("highScores") || '[]';
    let highScores = [...JSON.parse(highScoreString), newScore];

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    document.querySelector('.score1').innerText = `${highScores[0].name} : ${highScores[0].score}`;
    document.querySelector('.score2').innerText = `${highScores[1].name} : ${highScores[1].score}`;
    document.querySelector('.score3').innerText = `${highScores[2].name} : ${highScores[2].score}`;
    document.querySelector('.score4').innerText = `${highScores[3].name} : ${highScores[3].score}`;
    document.querySelector('.score5').innerText = `${highScores[4].name} : ${highScores[4].score}`;
}

//Music
function playMute() {
    if (musicSplash.muted) {
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

function power() {
    
    if (score%100 == 0) {
        powerDtime++
   }
   
   if (powerDtime >= 5) {
       powerD = false;
   }

   if (score%100 == 0) {
    powerCtime++
    }

    if (powerCtime >= 12) {
   powerC = false;
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

    if (event.code == 'KeyD' && !lightPerson.jump && !powerD) {
        if (onPlateform == true) {
            lightPerson.yVelocity -= 50;
            lightPerson.jump = true;
            powerD = true;
            powerDtime = 0
           
        }
        else {
            lightPerson.yVelocity -= 60;
            lightPerson.jump = true;
            powerD = true;
            powerDtime = 0
           
        }

    }

    if (event.code == 'KeyC' && !powerC) {
        superMan.xVelocity -= 80
        superMan.yVelocity += 70
        powerC = true;
        powerCtime = 0
        ghostPerson.xVelocity -= 80

        
        
        
    }
})


window.addEventListener('load', () => {
    canvas.style.display = 'none';
    restartBtn.style.display = 'none';
    gameOverScreen.style.display = 'none';
    marioAudio.style.display = 'none'
    musicSplash.play()

})
